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
  BlacklistingBlockContainer,
  MarketReasonContainer,
  RichTextEditorLoader,
  NotesContainer,
  BlackListIndicatorWrapper,
  StyledBase
} from './styles'
import { MARKETS, BLACKLIST_REASONS } from 'utils/constants'
import { FIELD_BLACKLISTED } from '../../itemParser'
import BlacklistedMarketsChip from './BlacklistedMarketsChip'

const StyledRichTextEditor = lazy(() =>
  import(/* webpackChunkName: "RichTextEditor" */ 'components/RichTextEditor/StyledRichTextEditor')
)

const statusOptions = ['Whitelisted', 'Blacklisted'].map(label => ({ label, value: label }))
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
    reason: BLACKLIST_REASONS[0],
    notes: ''
  }
}

const BlacklistingBlock = ({ blacklist, onBlacklistChange }) => {
  const [isBlacklisted, setIsBlacklisted] = useState(!!blacklist)
  const [state, dispatch] = useReducer(reducer, blacklist || getInitialState())

  const onChange = useCallback((field, value) => {
    dispatch({ type: 'updateField', field, value })
  }, [])

  const onStatusChange = value => {
    setIsBlacklisted(value === statusOptions[1].value)
  }

  const status = isBlacklisted ? statusOptions[1].value : statusOptions[0].value

  useEffect(() => {
    isBlacklisted
      ? onBlacklistChange(FIELD_BLACKLISTED, state)
      : onBlacklistChange(FIELD_BLACKLISTED, null)
  }, [isBlacklisted, state, onBlacklistChange])

  return (
    <Flex data-test="Blacklisting" direction="ttb">
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
      {isBlacklisted && (
        <StyledCard>
          <BlacklistingBlockContainer p={0} direction="ttb">
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
                  {BLACKLIST_REASONS.map((reason, index) => (
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
          </BlacklistingBlockContainer>
        </StyledCard>
      )}
    </Flex>
  )
}

const BlacklistIndicator = ({ blacklist }) => (
  <Flex direction="ttb">
    {!!blacklist ? (
      <Flex justify="between">
        <StyledBase data-test="Reason" color={COLORS.INACTIVE_GRAY}>
          {ReactHtmlParser(blacklist?.notes)}
        </StyledBase>
        <BlacklistedMarketsChip markets={blacklist?.markets} />
      </Flex>
    ) : (
      <BlackListIndicatorWrapper alignSelf="end">
        <Chip data-test="Whitelisted" variant={'primary'}>
          Whitelisted
        </Chip>
      </BlackListIndicatorWrapper>
    )}
  </Flex>
)

const Blacklisting = ({ isEditing, blacklist, onChange }) =>
  isEditing ? (
    <BlacklistingBlock blacklist={blacklist} onBlacklistChange={onChange} />
  ) : (
    <BlacklistIndicator blacklist={blacklist} />
  )

export default Blacklisting
