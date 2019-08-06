import React, { useState } from 'react'
import { StyledTabs, StyledTabList, StyledTab, StyledTabPanel, StyledLine } from './styles'
/**
 * Is rendering provided content as a Tabs and TabContents
 *
 * @param {Number} tabIndex Index of tab to be preselected
 * @param {Array<String>} tabs Index of tab to be preselected
 * @param {Array<React.Component>} tabContents Array of contents
 */
export const TabsWrapper = ({
  tabIdx = 0,
  tabs = ['Tab 1', 'Tab 2', 'Tab 3'],
  tabContents = ['1', '2', '3'],
  onTabSelect = () => {}
}) => {
  const [tabIndex, setTabIndex] = useState(tabIdx)

  const onSelect = tabIndex => {
    setTabIndex(tabIndex)
    onTabSelect(tabIndex)
  }

  return (
    <StyledTabs selectedIndex={tabIndex} onSelect={onSelect}>
      <StyledTabList>
        {tabs.map((tab, i) => (
          <StyledTab key={i}>{tab}</StyledTab>
        ))}
      </StyledTabList>
      <StyledLine />
      {tabContents.map((c, i) => (
        <StyledTabPanel key={i}>{c}</StyledTabPanel>
      ))}
    </StyledTabs>
  )
}

export default TabsWrapper
