import React from 'react'
import { shallow } from 'enzyme'
import Layout from 'components/Layout'

jest.mock('../../utils/AuthManager.ts')

describe('Layout.test.js: ', () => {
  const wrapper = shallow(<Layout>Click me!</Layout>)

  it('Layout to de defined', () => {
    expect(wrapper).toBeDefined()
  })
})
