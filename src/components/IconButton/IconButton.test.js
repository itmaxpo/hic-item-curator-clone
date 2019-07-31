import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import IconButton from 'components/IconButton'
import { AddIcon } from 'components/Icon'

describe('IconButton.test.js: ', () => {
  const mockClick = sinon.spy()
  const wrapper = mount(<IconButton iconComponent={AddIcon} onClick={mockClick} />)

  it('to de defined', () => {
    expect(wrapper).toBeDefined()
  })

  it('not defined if there is no iconComponent', () => {
    const notDefinedWrapper = mount(<IconButton iconComponent={AddIcon} />)
    expect(notDefinedWrapper).toEqual({})
  })

  it('to have proper onClick callback', () => {
    wrapper.simulate('click')
    sinon.assert.calledOnce(mockClick)
  })

  it('to have tooltip rendered if tooltipLabel is provided', () => {
    const tooltip = mount(
      <IconButton iconComponent={AddIcon} onClick={mockClick} tooltipLabel={'Tooltip'} />
    )
    const tooltipWrapper = tooltip.find('div')

    expect(tooltipWrapper.props().title).toEqual('Tooltip')
  })
})
