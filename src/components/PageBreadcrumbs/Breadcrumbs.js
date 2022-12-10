import { useEffect, useState } from 'react'
import { some } from 'lodash'
import styled from 'styled-components'
import { COLORS, SvgIcon } from '@tourlane/tourlane-ui'
import DropdownRightIcon from '@tourlane/iconography/Glyphs/Navigation/DropdownRight'
import { Link as RouteLink } from 'react-router-dom'
import { getCountry, getAreasById } from '../../services/breadcrumbsApi'
import { generateBreadcrumbs } from '../../pages/Item/ItemLayout/utils'
import { useParams, useSearchParams } from 'react-router-dom'
import * as Sentry from '@sentry/browser'

const StyledNav = styled.nav`
  font-size: 18px;
  font-family: 'Source Sans Pro', sans-serif;
  display: flex;
  align-items: center;
`

const Link = styled(RouteLink)`
  &,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
  &:hover,
  &:focus,
  &:active {
    color: ${COLORS.ADVENTURE_GREEN_FOCUSED};
  }
`
const Breadcrumb = ({ breadcrumb, isLast }) =>
  isLast ? (
    <strong>{breadcrumb.text}</strong>
  ) : (
    <>
      <Link to={breadcrumb.url}>{breadcrumb.text}</Link>
      <SvgIcon size={16} color={COLORS.ELEMENT_GRAY}>
        <DropdownRightIcon />
      </SvgIcon>
    </>
  )

const Breadcrumbs = ({ className, ancestors, name, originalName }) => {
  const { id } = useParams()
  const [urlParams] = useSearchParams()
  const locale = urlParams.get('language')
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    const retrieveBreadcrumbsData = async () => {
      await Promise.all([
        getCountry(ancestors?.find((item) => item.item_type === 'Country')?.uuid),
        getAreasById({
          area_uuids: ancestors
            ?.filter((item) => item.item_type === 'Area')
            .map((item) => item.uuid),
          locale
        })
      ])
        .then(([{ data: country }, { data: areas }]) => {
          const breadcrumbData = [
            country,
            ...areas,
            {
              id: '',
              uuid: '',
              original_name: originalName,
              name: name,
              area_type: null
            }
          ]
            .filter(
              (item) =>
                (item?.original_name || item?.name) &&
                (!item?.area_type || item?.area_type === 'admin')
            )
            .map((item) => ({ name: item?.name ?? item?.original_name, id: item?.uuid }))
          setBreadcrumbs(generateBreadcrumbs(breadcrumbData))
        })
        .catch((e) => {
          Sentry.captureException(e)
        })
    }
    retrieveBreadcrumbsData().then()
  }, [id, locale, name, ancestors, originalName])
  return (
    <StyledNav className={className}>
      {some(breadcrumbs) &&
        breadcrumbs.map((breadcrumb, index) => (
          <Breadcrumb
            data-test={`breadcrumb-${breadcrumb}`}
            key={`breadcrumb-${index}`}
            breadcrumb={breadcrumb}
            isLast={index === breadcrumbs.length - 1}
          />
        ))}
    </StyledNav>
  )
}

export default Breadcrumbs
