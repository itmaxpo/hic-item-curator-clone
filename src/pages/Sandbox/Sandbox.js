import React from 'react'
import TabsWrapper from 'components/Tabs'

/**
 * This is the Sandbox Page component
 * Use it to play with components
 *
 * @name Sandbox
 * @returns {Object} Sandbox Page
 */
const SandboxPage = () => {
  return (
    <div>
      <TabsWrapper
        tabs={['Stuff 1', 'Stuff 2', 'Stuff 3']}
        tabContents={[<p>Hello 1</p>, 123, 123]}
      />
    </div>
  )
}

export default SandboxPage
