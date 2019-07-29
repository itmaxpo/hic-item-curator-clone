import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

const fieldMaps = {}

/**
 * Adds fields to extend current Container of fields
 *
 * @name addPropsToFields
 * @param fields
 */
const addPropsToFields = fields => {
  const fieldsWithProps = []

  fields.forEach(field => {
    if (field.container && field.fields) {
      const { container, fields, ...props } = field
      fieldsWithProps.push({
        Container: container,
        fields: addPropsToFields(fields),
        ...props
      })
    } else if (field.component || field.type) {
      const { component, ...props } = field
      fieldsWithProps.push({
        Component: component || fieldMaps[field.type],
        ...props
      })
    }
  })

  return fieldsWithProps
}

/**
 * Renders fields based on fields object provided
 * Checks if it a Container or just a field
 *
 * @name renderFields
 * @param fields
 */
const renderFields = fields =>
  fields.map((field, index) => {
    if (field.Container && field.fields) {
      const { Container, fields, ...props } = field

      return (
        <Container key={index} {...props}>
          {renderFields(fields)}
        </Container>
      )
    }

    const { Component, ...props } = field

    return (
      <Fragment key={index}>
        <Component {...props} />
      </Fragment>
    )
  })

/**
 * Returns fields, that should be rendered based on fields object provided
 *
 * @name FormFields
 * @param {Object} props.fields
 */
const FormFields = ({ fields }) => {
  if (fields === undefined) {
    throw new Error('You are calling FormFields with an undefined fields.')
  }

  const fieldsWithProps = useMemo(() => addPropsToFields(fields), [fields])
  const fieldsToBeRendered = useMemo(() => renderFields(fieldsWithProps), [fieldsWithProps])

  return fieldsToBeRendered
}

FormFields.propType = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired
    })
  ).isRequired
}

export default FormFields
