import React from 'react'
import { Button, SecondaryButton } from 'components/Button'
import { mount } from 'enzyme'

describe('Button.test.js: ', () => {
  const button = mount(<Button>Click me!</Button>)
  const secondaryButton = mount(<SecondaryButton>Click me!</SecondaryButton>)

  it('Button && SecondaryButton to de defined', () => {
    expect(button).toBeDefined()
    expect(secondaryButton).toBeDefined()
  })
})
