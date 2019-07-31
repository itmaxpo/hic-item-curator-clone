import React from 'react'
import Header from 'components/Header'
import { shallow } from 'enzyme'

describe('Header.test.js: ', () => {
  const wrapper = shallow(<Header>Click me!</Header>)

  it('Header to de defined', () => {
    expect(wrapper).toBeDefined()
  })
})
