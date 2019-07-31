import React from 'react'
import { mount } from 'enzyme'
import Background from 'components/Background'

describe('Background.test.js', () => {
  let wrapper

  describe('1. Behavioral tests', () => {
    beforeEach(() => {
      wrapper = mount(
        <Background>
          <p>Some text</p>
        </Background>
      )
    })

    it('Background to be defined', () => {
      expect(wrapper).toBeDefined()
    })

    it('1.1 should render children', () => {
      expect(wrapper.find('p').text()).toEqual('Some text')
    })
  })
})
