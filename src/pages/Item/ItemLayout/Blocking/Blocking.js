import React, { useState, useReducer, useCallback, useEffect, lazy, Suspense } from 'react'
import ReactHtmlParser from 'react-html-parser'
import {
  Flex,
  FlexContainer,
  Base,
  Strong,
  Dropdown,
  H4,
  Label,
  Radio,
  Chip,
  COLORS
} from '@tourlane/tourlane-ui'
import {
  StyledCard,
  StatusContainer,
  BlockedBlockContainer,
  MarketReasonContainer,
  RichTextEditorLoader,
  NotesContainer,
  BlockedIndicatorWrapper,
  StyledBase
} from './styles'
import { MARKETS, BLOCKED_REASONS } from 'utils/constants'
import { FIELD_BLOCKED } from '../../itemParser'
import BlockedMarketsChip from './BlockedMarketsChip'

const StyledRichTextEditor = lazy(() =>
  import(/* webpackChunkName: "RichTextEditor" */ 'components/RichTextEditor/StyledRichTextEditor')
)

const statusOptions = ['Allowed', 'Blocked'].map(label => ({ label, value: label }))
const marketsOptions = MARKETS.map(label => ({ label, value: label, checkbox: true }))

function reducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value
      }
    default:
      throw new Error()
  }
}

function getInitialState() {
  return {
    markets: MARKETS,
    reason: BLOCKED_REASONS[0],
    notes: ''
  }
}

const BlockingBlock = ({ blocked, onBlockedChange }) => {
  const [isBlocked, setIsBlocked] = useState(!!blocked)
  const [state, dispatch] = useReducer(reducer, blocked || getInitialState())

  const onChange = useCallback((field, value) => {
    dispatch({ type: 'updateField', field, value })
  }, [])

  const onStatusChange = value => {
    setIsBlocked(value === statusOptions[1].value)
  }

  const status = isBlocked ? statusOptions[1].value : statusOptions[0].value

  useEffect(() => {
    isBlocked ? onBlockedChange(FIELD_BLOCKED, state) : onBlockedChange(FIELD_BLOCKED, null)
  }, [isBlocked, state, onBlockedChange])

  return (
    <Flex data-test="Blocking" direction="ttb">
      <StatusContainer>
        <Base>
          <Strong>Status: </Strong>
        </Base>
        <Dropdown
          data-test="Status"
          notClearable
          onChange={onStatusChange}
          options={statusOptions}
          value={status}
        />
      </StatusContainer>
      {isBlocked && (
        <StyledCard>
          <BlockedBlockContainer direction="ttb">
            <MarketReasonContainer direction="ttb">
              <FlexContainer direction="ttb" p={0} pb={1}>
                <H4 withBottomMargin>Market</H4>
                <Dropdown
                  data-test="Markets"
                  multiple
                  options={marketsOptions}
                  placeholder={'Select market'}
                  shrinkPlaceholder
                  value={state.markets}
                  onChange={value => {
                    onChange('markets', value)
                  }}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  withToggleAll
                />
              </FlexContainer>
              <FlexContainer direction="ttb" p={0} pb={1}>
                <H4 withBottomMargin>Reason</H4>
                <Flex direction="ttb" justify="between">
                  {BLOCKED_REASONS.map((reason, index) => (
                    <div key={reason}>
                      <Label withBottomMargin={index === 0} htmlFor={reason}>
                        <Radio
                          id={reason}
                          data-test={`Reason-${index}`}
                          onChange={e => {
                            onChange('reason', e.target.value)
                          }}
                          value={reason}
                          name={'reason'}
                          defaultChecked={reason === state.reason}
                        />
                        <Base>{reason}</Base>
                      </Label>
                    </div>
                  ))}
                </Flex>
              </FlexContainer>
            </MarketReasonContainer>
            <NotesContainer direction="ttb">
              <H4 withBottomMargin>Notes</H4>
              <Suspense fallback={<RichTextEditorLoader />}>
                <StyledRichTextEditor
                  data-test="Notes"
                  onChange={value => {
                    onChange('notes', value)
                  }}
                  value={state.notes}
                />
              </Suspense>
            </NotesContainer>
          </BlockedBlockContainer>
        </StyledCard>
      )}
    </Flex>
  )
}

const BlockedIndicator = ({ blocked }) => (
  <Flex direction="ttb">
    {!!blocked ? (
      <Flex justify="between">
        <StyledBase data-test="Reason" color={COLORS.INACTIVE_GRAY}>
          {ReactHtmlParser(blocked?.notes)}
        </StyledBase>
        <BlockedMarketsChip markets={blocked?.markets} />
      </Flex>
    ) : (
      <BlockedIndicatorWrapper alignSelf="end">
        <Chip data-test="Allowed" variant={'primary'}>
          Allowed
        </Chip>
      </BlockedIndicatorWrapper>
    )}
  </Flex>
)

const Blocking = ({ isEditing, blocked, onChange }) =>
  isEditing ? (
    <BlockingBlock blocked={blocked} onBlockedChange={onChange} />
  ) : (
    <BlockedIndicator blocked={blocked} />
  )

export default Blocking
