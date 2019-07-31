/* eslint-disable */

import React from 'react'
import { TextField } from '@tourlane/tourlane-ui'
import FormFields from 'components/Form'
import { mount } from 'enzyme'
import sinon from 'sinon'
import AppContainer from 'components/AppContainer'

describe('Form.test.js', () => {
  let fields, wrapper, mockClick1, mockClick2, mockClick3, mockClick4

  beforeEach(() => {
    ;(mockClick1 = sinon.spy()),
      (mockClick2 = sinon.spy()),
      (mockClick3 = sinon.spy()),
      (mockClick4 = sinon.spy())

    fields = [
      {
        name: 'text',
        type: 'text',
        component: TextField,
        onChange: mockClick1
      },
      {
        name: 'text',
        type: 'text',
        component: TextField,
        onChange: mockClick2
      },
      {
        name: 'Checkboxes',
        container: AppContainer,
        fields: [
          {
            name: 'text',
            type: 'text',
            component: TextField,
            onChange: mockClick3
          },
          {
            name: 'text',
            type: 'text',
            component: TextField,
            onChange: mockClick4
          }
        ]
      }
    ]

    wrapper = mount(<FormFields fields={fields} />)
  })

  it('FormFields are defined and created', () => {
    expect(wrapper).toBeDefined()
    expect(fields.length).toEqual(3)
  })

  it('FormFields not rendred if empty fields', () => {
    wrapper = mount(<FormFields fields={[]} />)
    expect(wrapper).toEqual({})
  })

  describe('1. Behavioral tests', () => {
    it('should render 1 form field and click should work', () => {
      const firstInput = wrapper.find('div div input').at(0)
      firstInput.simulate('change', {
        target: { value: 'hello' }
      })

      sinon.assert.calledOnce(mockClick1)
      sinon.assert.notCalled(mockClick2)
      sinon.assert.notCalled(mockClick3)
      sinon.assert.notCalled(mockClick4)
    })

    it('should render 2 form field and click should work', () => {
      const secondInput = wrapper.find('div div input').at(1)
      secondInput.simulate('change', {
        target: { value: 'hello' }
      })

      sinon.assert.notCalled(mockClick1)
      sinon.assert.calledOnce(mockClick2)
      sinon.assert.notCalled(mockClick3)
      sinon.assert.notCalled(mockClick4)
    })

    it('should render container form field and clicks should work', () => {
      const thirdInput = wrapper.find('div div div input').at(0)
      const fourthInput = wrapper.find('div div div input').at(1)
      thirdInput.simulate('change', {
        target: { value: 'hello' }
      })
      fourthInput.simulate('change', {
        target: { value: 'hello' }
      })

      sinon.assert.notCalled(mockClick1)
      sinon.assert.notCalled(mockClick2)
      sinon.assert.calledOnce(mockClick3)
      sinon.assert.calledOnce(mockClick4)
    })
  })
})
