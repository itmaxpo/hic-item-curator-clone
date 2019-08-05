import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import StatusIndicator, {
  STATUS_IN_PROGRESS,
  STATUS_IN_PROGRESS_LABEL,
  colorsBasedOnStatus,
  STATUS_ON_HOLD,
  STATUS_ON_HOLD_LABEL,
  STATUS_ONLINE,
  STATUS_ONLINE_LABEL,
  STATUS_OFFLINE,
  STATUS_OFFLINE_LABEL
} from './StatusIndicator'

describe('StatusIndicator.test.js: ', () => {
  const wrapper = shallow(<StatusIndicator status={STATUS_IN_PROGRESS} />)

  it('to de defined', () => {
    expect(wrapper).toBeDefined()
  })

  it('to render correct In progress status', () => {
    const statusText = wrapper.find('*').at(2)
    const indicatorColor = renderer.create(wrapper.find('*').at(1)).toJSON()

    expect(statusText.text()).toEqual(STATUS_IN_PROGRESS_LABEL)
    expect(indicatorColor).toHaveStyleRule(
      'background-color',
      colorsBasedOnStatus[STATUS_IN_PROGRESS]
    )
  })

  it('to render correct In progress status', () => {
    const wrapperOnHold = shallow(<StatusIndicator status={STATUS_ON_HOLD} />)

    const statusText = wrapperOnHold.find('*').at(2)
    const indicatorColor = renderer.create(wrapperOnHold.find('*').at(1)).toJSON()

    expect(statusText.text()).toEqual(STATUS_ON_HOLD_LABEL)
    expect(indicatorColor).toHaveStyleRule('background-color', colorsBasedOnStatus[STATUS_ON_HOLD])
  })

  it('to render correct In progress status', () => {
    const wrapperOnline = shallow(<StatusIndicator status={STATUS_ONLINE} />)

    const statusText = wrapperOnline.find('*').at(2)
    const indicatorColor = renderer.create(wrapperOnline.find('*').at(1)).toJSON()

    expect(statusText.text()).toEqual(STATUS_ONLINE_LABEL)
    expect(indicatorColor).toHaveStyleRule('background-color', colorsBasedOnStatus[STATUS_ONLINE])
  })

  it('to render correct In progress status', () => {
    const wrapperOffline = shallow(<StatusIndicator status={STATUS_OFFLINE} />)

    const statusText = wrapperOffline.find('*').at(2)
    const indicatorColor = renderer.create(wrapperOffline.find('*').at(1)).toJSON()

    expect(statusText.text()).toEqual(STATUS_OFFLINE_LABEL)
    expect(indicatorColor).toHaveStyleRule('background-color', colorsBasedOnStatus[STATUS_OFFLINE])
  })
})
