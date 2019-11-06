import styled from 'styled-components'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { COLORS } from '@tourlane/tourlane-ui'

export const StyledTabs = styled(Tabs)`
  width: 100%;
  border-radius: 4px;
  background-color: #ffffff;

  position: relative;
  font-family: SourceSansPro, serif;
`

export const StyledTabList = styled(TabList)`
  list-style: none;
  display: flex;
  padding: 32px 20px 0 20px;
  margin: 0;
  position: relative;
  z-index: 1;
`

export const StyledTab = styled(Tab)`
  outline: none;
  margin: 0 40px;
  padding-bottom: 12px;

  > p {
    color: ${COLORS.INACTIVE_GRAY};
    font-size: 18px;
    margin: 0;
    padding: 0;
    font-weight: 600;

    &:hover {
      color: ${COLORS.NIGHTINGALE_BLACK};
      font-size: 18px;
    }
  }

  &:hover {
    cursor: pointer;
    margin: 0 40px;
    padding-bottom: 8px;
    border-bottom: 4px solid ${COLORS.ADVENTURE_GREEN};
  }

  &[class$='--selected'] {
    cursor: pointer;
    margin: 0 40px;
    padding-bottom: 9px;
    border-bottom: 4px solid ${COLORS.ADVENTURE_GREEN};

    > p {
      color: ${COLORS.NIGHTINGALE_BLACK};
    }
  }
`

export const StyledTabPanel = styled(TabPanel)``

export const StyledLine = styled.hr`
  width: 100%;
  border-top: 0.5px solid ${COLORS.LINE_GRAY};
  margin: 0;
  position: absolute;
  top: 69px;
`

export const StyledPanelWrapper = styled.div`
  padding-top: 40px;
  margin-top: 35px;
  box-shadow: 0 1px 4px 0 rgba(63, 65, 68, 0.3);
`
