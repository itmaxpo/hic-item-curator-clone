import styled from 'styled-components'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { COLORS } from '@tourlane/tourlane-ui'

export const StyledTabs = styled(Tabs)`
  width: 100%;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
`

export const StyledTabList = styled(TabList)`
  list-style: none;
  display: flex;
  padding: 20px 20px 0 20px;
  margin: 0;
`

export const StyledTab = styled(Tab)`
  outline: none;
  padding: 6px 40px 26px 40px;

  &:hover {
    cursor: pointer;
    padding: 6px 40px 23px 40px;
    border-bottom: 3px solid ${COLORS.ADVENTURE_GREEN_FOCUSED};
  }
`

export const StyledTabPanel = styled(TabPanel)`
  padding: 40px 60px;
`

export const StyledLine = styled.hr`
  width: 100%;
  border-top: 0.5px solid ${COLORS.LINE_GRAY};
  margin: 0;
`
