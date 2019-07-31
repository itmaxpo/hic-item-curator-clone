import React from 'react'
import AppContainer from 'components/AppContainer'
import { shallow } from 'enzyme'

describe('AppContainer.test.js:', () => {
  describe('1. Behavioral tests:', () => {
    it('should render children', () => {
      const wrapper = shallow(
        <AppContainer>
          <p>Some text</p>
        </AppContainer>
      )

      expect(wrapper).toBeDefined()
      expect(wrapper.find('p').text()).toEqual('Some text')
    })
  })
})
