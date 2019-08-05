import React from 'react'
import { shallow } from 'enzyme'
import Loader from './Loader'

describe('Loader.test.js: ', () => {
  const wrapper = shallow(<Loader />)

  it('to de defined', () => {
    expect(wrapper).toBeDefined()
  })
})
