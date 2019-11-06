import React from 'react'
import styled from 'styled-components'
import { FlexContainer, Accordion, Skeleton } from '@tourlane/tourlane-ui'
import { TitleWithContent } from '../styles'

export const Column = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  ${({ isExpanded }) => (isExpanded ? 'width: 49%;' : 'width: 100%;')}
`

export const TitleContainer = styled(FlexContainer)`
  height: 36px;
`

export const StyledTitleWithContent = styled(TitleWithContent)`
  overflow: hidden;
  padding-bottom: 20px;
`

export const RichTextEditorLoader = () => <Skeleton height="235px" />

export const StyledAccordion = styled(Accordion)`
  padding: 10px 30px;
  font-family: 'Source Sans Pro', sans-serif;
`
