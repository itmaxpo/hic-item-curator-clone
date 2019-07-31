import React from 'react'
import { mount } from 'enzyme'
import { BackgroundSingleCard } from 'components/Background'

describe('BackgroundSingleCard.test.js: ', () => {
  let wrapper

  describe('1. Behavioral tests', () => {
    beforeEach(() => {
      wrapper = mount(
        <BackgroundSingleCard cardProps={{ width: '100px' }}>
          <p>Some text</p>
        </BackgroundSingleCard>
      )
    })

    it('BackgroundSingleCard to be defined', () => {
      expect(wrapper).toBeDefined()
    })

    it('1.1 should render correct props', () => {
      expect(wrapper.props().cardProps).toBeDefined()
      expect(wrapper.props().cardProps.width).toEqual('100px')
    })
  })
})
