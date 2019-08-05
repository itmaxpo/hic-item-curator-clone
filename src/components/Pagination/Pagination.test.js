import React from 'react'
import { shallow } from 'enzyme'
import Pagination from './Pagination'

describe('Pagination.test.js: ', () => {
  const wrapper = shallow(<Pagination total={31} limit={10} pageCount={10} currentPage={1} />)

  it('to de defined', () => {
    expect(wrapper).toBeDefined()
  })
})
