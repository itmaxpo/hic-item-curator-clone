import React, { lazy, Suspense, useState, useEffect, Fragment } from 'react'
import { isEmpty } from 'lodash'
import ReactHtmlParser from 'react-html-parser'
import { Slide } from '@material-ui/core'
import { H4, FlexContainer, Card, AccordionGroup } from '@tourlane/tourlane-ui'
import ShowMore from 'components/ShowMore'
import CircleButton from 'components/CircleButton'
import { ChevronLeftIcon, ChevronRightIcon } from 'components/Icon'
import {
  Column,
  TitleContainer,
  StyledTitleWithContent,
  StyledAccordion,
  RichTextEditorLoader
} from './styles'
import { parseInspirations, getRichTextValue } from './utils'

const StyledRichTextEditor = lazy(() =>
  import(/* webpackChunkName: "RichTextEditor" */ './StyledRichTextEditor')
)

const ContentInspiration = ({ description, inspirations }) => (
  <Card>
    <AccordionGroup>
      {parseInspirations(description, inspirations).map((d, i) => (
        <StyledAccordion
          data-test={`item-inspiration-${d.label}`}
          key={i}
          name={d.label}
          title={d.label}
          badge={d.badge}
          badgeVariant={'alarm'}
        >
          {ReactHtmlParser(d.value)}
        </StyledAccordion>
      ))}
    </AccordionGroup>
  </Card>
)

const CollapseButton = ({ isExpanded, onClick, dataTest }) => (
  <CircleButton visibleOnHover={false} onClick={onClick} data-test="inspiration-collapse-button">
    {isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
  </CircleButton>
)

const Description = ({ type, description, descriptionInspiration, onChange, isEditing }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isDescriptionInspirationPresent = !isEmpty(descriptionInspiration)

  const onDescriptionUpdate = newDescription => {
    onChange('description', newDescription)
  }

  // safeguard in case there were description saved with empty text
  const _description = isEmpty(getRichTextValue(description)) ? '' : description

  useEffect(() => {
    if (!isEditing) setIsExpanded(false)
  }, [isEditing])

  useEffect(() => {
    if (!isDescriptionInspirationPresent) setIsExpanded(false)
  }, [descriptionInspiration, isDescriptionInspirationPresent])

  return (
    <StyledTitleWithContent>
      <FlexContainer data-test={'item-description-wrapper'} p={0} justify="between">
        <Column isExpanded={isExpanded}>
          <TitleContainer justify="between" alignItems="center" p={0} mb={1 / 4}>
            <H4 data-test={'item-description-header'}>Description</H4>
            {isEditing && isDescriptionInspirationPresent && (
              <CollapseButton
                dataTest={'item-desc-collapsed-button'}
                isExpanded={isExpanded}
                onClick={() => {
                  setIsExpanded(!isExpanded)
                }}
              />
            )}
          </TitleContainer>
          {isEditing ? (
            <Suspense fallback={<RichTextEditorLoader />}>
              <StyledRichTextEditor
                data-test={'item-description-editor'}
                placeholder={`Please write something about the ${type}`}
                value={_description}
                onChange={onDescriptionUpdate}
              />
            </Suspense>
          ) : (
            <ShowMore
              data-test={'item-show-more'}
              collapsed={true}
              height={'350px'}
              size={'20px'}
              lines={12}
            >
              {!isEmpty(_description) ? ReactHtmlParser(_description) : 'No description'}
            </ShowMore>
          )}
        </Column>
        <Slide direction="left" in={isExpanded} mountOnEnter unmountOnExit>
          <Column isExpanded={isExpanded}>
            {isDescriptionInspirationPresent && (
              <Fragment>
                <TitleContainer justify="between" alignItems="center" p={0} mb={1 / 4}>
                  <H4 data-test={'item-inspiration'}>Content Inspiration</H4>
                </TitleContainer>
                <ContentInspiration
                  description={_description}
                  inspirations={descriptionInspiration}
                />
              </Fragment>
            )}
          </Column>
        </Slide>
      </FlexContainer>
    </StyledTitleWithContent>
  )
}

export default Description