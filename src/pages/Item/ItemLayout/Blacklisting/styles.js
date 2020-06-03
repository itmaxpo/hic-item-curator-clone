import React from 'react'
import styled from 'styled-components'
import { Flex, Card, Skeleton, IconFlag, Chip, Base } from '@tourlane/tourlane-ui'

export const StyledCard = styled(Card)`
  margin-top: 20px;
  margin-bottom: 5px;
`

export const StatusContainer = styled(Flex)`
  width: 20%;
  justify-content: space-between;
  align-items: center;

  > div {
    width: 75%;
  }
`

export const BlacklistingBlockContainer = styled(Flex)`
  padding: 40px 60px;
`

export const MarketReasonContainer = styled(Flex)`
  width: 71%;
`

export const NotesContainer = styled(Flex)`
  .draft-editor-container {
    min-height: 60px !important;
  }
`

export const BlackListIndicatorWrapper = styled(Flex)`
  height: 34px;
  > span {
    height: 34px;
  }
`

export const RichTextEditorLoader = () => <Skeleton height="200px" />

export const StyledIconFlag = styled(IconFlag)`
  padding-left: 5px;
`

export const StyledChip = styled(Chip)`
  > span {
    display: flex;
    align-items: center;
  }
`

export const StyledBase = styled(Base)`
  max-width: 75%;
  && > p {
    margin: 0;
  }
`
