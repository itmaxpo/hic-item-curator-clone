import React from 'react'
import ExpansionPanelWrapper from 'components/ExpansionPanel'

// Example of expansion table data
const descriptions = [
  { title: 'Health', description: 'Some descriptions about health' },
  { title: 'Stuff 2', description: 'Some descriptions about stuff 2' },
  { title: 'Stuff 3', description: 'Some descriptions about stuff 3' },
  { title: 'Insurance', description: 'Some descriptions about insurance' },
  { title: 'Money', description: 'Some descriptions about money' }
]

/**
 * This is an example of the ExpansionExample components put together
 *
 * @name ExpansionExample
 * @returns {Object} ExpansionExample
 */
const ExpansionExample = () => {
  return <ExpansionPanelWrapper descriptions={descriptions} />
}

export default ExpansionExample
