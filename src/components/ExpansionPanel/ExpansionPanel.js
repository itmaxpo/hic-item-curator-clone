import React, { useEffect, useState } from 'react'
import { GlyphChevronDownIcon } from 'components/Icon'
import { Flex } from '@tourlane/tourlane-ui'
import { Wrapper, StyledHeader, StyledCollapse, StyledBody, BadgeContainer } from './styles'
import ReactHtmlParser from 'react-html-parser'

const Badge = ({ color, children }) => (
  <BadgeContainer color={color}>
    <span>{children}</span>
  </BadgeContainer>
)
/**
 * Collapsible element
 *
 * @param {String} title to render header of the collapsible element
 * @param {Boolean} collapsed
 * @param {Aray<React.Component>} children to render in collapsed area
 */
export const Collapsible = ({
  title,
  collapsed = true,
  spacing,
  badge = '',
  badgeColor,
  children
}) => {
  const ref = React.createRef()
  const ref2 = React.createRef()

  const [isCollapsed, setIsCollapsed] = useState(collapsed)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    if (!isCollapsed) {
      ref.current.style.height = `${ref.current.scrollHeight}px`
      ref2.current.style.transform = 'rotate(180deg)'
    } else {
      ref.current.style.height = `0px`
      ref2.current.style.transform = 'rotate(360deg)'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed])

  return (
    <StyledCollapse spacing={spacing}>
      <StyledHeader onClick={toggleCollapse}>
        <Flex alignItems="center">
          {title}
          {badge && <Badge color={badgeColor}>{badge}</Badge>}
        </Flex>
        <span ref={ref2}>
          <GlyphChevronDownIcon />
        </span>
      </StyledHeader>
      <StyledBody
        ref={ref}
        style={{
          marginTop: 20,
          overflow: 'hidden',
          transition: 'height 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }}
        collapsed={isCollapsed}
      >
        {children}
      </StyledBody>
    </StyledCollapse>
  )
}

/**
 * Uses Array of Collapsible elements
 *
 * @param {Array<{ label: String, field: Stirng, value: String }>} descriptions
 */
const ExpansionPanelWrapper = ({ descriptions = [], spacing = 'M', children }) => {
  return (
    <Wrapper data-test={'collapsible-wrapper'}>
      {descriptions.length > 0
        ? descriptions.map((description, i) => (
            <Collapsible
              data-test={`collapsible-${i}`}
              key={i}
              badge={description.badge}
              badgeColor={description.badgeColor}
              title={description.label}
              spacing={spacing}
              collapsed={description.collapsed}
            >
              {ReactHtmlParser(description.value || 'No information found')}
            </Collapsible>
          ))
        : children}
    </Wrapper>
  )
}

export default ExpansionPanelWrapper
