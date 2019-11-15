import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@tourlane/tourlane-ui'

const ItemLayoutLoaderWrapper = styled.div`
  margin: 110px 90px;
  height: 102px;
`

const ItemLayoutLoaderTitleWrapper = styled.div`
  margin: 20px 0 10px 0;
`

export const ItemLayoutLoader = () => (
  <ItemLayoutLoaderWrapper>
    <ItemLayoutLoaderTitleWrapper>
      <Skeleton height="30px" width="320px" />
    </ItemLayoutLoaderTitleWrapper>
    <Skeleton height="26px" width="100px" widthRandomness={0.75} count={3} />
  </ItemLayoutLoaderWrapper>
)

const TabContentLoaderWrapper = styled.div`
  > div {
    margin-top: -42px;
    margin-bottom: -6px;
  }
`
export const TabContentLoader = () => (
  <TabContentLoaderWrapper>
    <Skeleton height="500px" />
  </TabContentLoaderWrapper>
)
