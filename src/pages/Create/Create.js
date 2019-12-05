import React, { lazy, Suspense, useState, useEffect, useContext } from 'react'
import { values, isEmpty } from 'lodash'
import { withRouter } from 'react-router-dom'
import { Skeleton } from '@tourlane/tourlane-ui'
import { getLocationCoordinates } from './utils'
import SuppliersContext from 'contexts/Suppliers'
import { createItem, createSupplier } from 'services/contentApi'
import { parseSuppliers } from 'contexts/Suppliers/utils'
import { useNotification } from 'components/Notification'
import Layout from 'components/Layout'
import { Wrapper } from './styles'

const Form = lazy(() => import(/* webpackChunkName: "CreateForm" */ './Form'))

/**
 * Create Page component
 * The purpose of this page is to give the user the ability
 * to create new items
 *
 * @name Create
 * @returns {Object} Search Page
 */

const Create = ({ history }) => {
  const { enqueueNotification } = useNotification()

  const [itemType, setItemType] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [supplier, setSupplier] = useState(undefined)

  const [coordinates, setCoordinates] = useState(undefined)
  const [polygon, setPolygon] = useState(undefined)
  const [locationInfo, setLocationInfo] = useState(undefined)

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  const { suppliers, setSuppliers } = useContext(SuppliersContext)

  const onLocationChangeHandler = place => {
    if (isEmpty(place)) return

    const { coordinates: newCoordinates, polygon } = getLocationCoordinates(place)
    setCoordinates(newCoordinates)
    setPolygon(polygon)

    const newLocationInfo = {
      address: place.label,
      geoCoords: newCoordinates
    }

    setLocationInfo(newLocationInfo)
  }

  const onCreateItemHandler = async () => {
    try {
      if (!suppliers.some(supp => supp.value === supplier.value)) {
        const newSupplier = await createSupplier(supplier.value)
        setSuppliers([...suppliers, ...parseSuppliers([newSupplier.data])])
      }

      const { data } = await createItem(
        itemType.value,
        name,
        supplier.value,
        coordinates.lat,
        coordinates.lng,
        locationInfo.address
      )

      // 2.5s delay to let progress button animation finish
      setTimeout(() => {
        history.push(`/item/${data.uuid}?language=en-GB`)
      }, 2500)
    } catch (e) {
      console.warn(e)
      enqueueNotification({ variant: 'error', message: 'Failed to create item' })
    }
  }

  // effect to enable/disable submit button
  useEffect(() => {
    if (values({ itemType, name, supplier, coordinates }).some(isEmpty)) {
      setIsSubmitDisabled(true)
    } else {
      setIsSubmitDisabled(false)
    }
  }, [itemType, name, supplier, coordinates])

  const formProps = {
    itemType,
    setItemType,
    setName,
    suppliers,
    supplier,
    setSupplier,
    onLocationChangeHandler,
    isSubmitDisabled,
    onCreateItemHandler,
    coordinates,
    polygon,
    locationInfo
  }

  return (
    <Layout>
      <Wrapper data-test="createItemPage">
        <Suspense fallback={<Skeleton height="520px" />}>
          <Form {...formProps} />
        </Suspense>
      </Wrapper>
    </Layout>
  )
}

export default withRouter(Create)
