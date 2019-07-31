import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import sinon from 'sinon'
import CircleButton from 'components/CircleButton'

describe('CircleButton.test.js', () => {
  let circleButton, mockClick

  beforeEach(() => {
    mockClick = sinon.spy()
    circleButton = mount(<CircleButton onClick={mockClick}>Click me!</CircleButton>)
  })

  it('CircleButton to be defined', () => {
    expect(circleButton).toBeDefined()
  })

  describe('1. Behavioral tests', () => {
    it('1.1 should render correct oval element with clickHandler', () => {
      // Simulate click on <Oval> element
      const oval = circleButton.find('div').at(1)

      oval.simulate('click')
      expect(mockClick).toHaveProperty('callCount', 1)
    })

    it('1.2 should render correct oval element with visibleOnHover equal false', () => {
      const oval = mount(
        <CircleButton onClick={mockClick} visibleOnHover={false}>
          Click me!
        </CircleButton>
      )
        .find('div')
        .at(1)

      expect(oval.props().visibleOnHover).toBeFalsy()
    })

    it('1.3 should render correct tooltip', () => {
      const tooltip = mount(
        <CircleButton onClick={mockClick} visibleOnHover={false} tooltipText={'Tooltip'}>
          Click me!
        </CircleButton>
      ).find('div div')

      expect(tooltip.props().title).toEqual('Tooltip')
    })
  })

  describe('2. Styling tests', () => {
    it('2.1 should render correct styles by default', () => {
      const ovalToJSON = renderer.create(circleButton.find('div').at(1)).toJSON()

      expect(ovalToJSON).toHaveStyleRule('opacity', '0')
      expect(ovalToJSON).toHaveStyleRule('transform', 'scale(0.5)')
    })

    it('2.2 should not render visibleOnHover styles for <Oval>', () => {
      const notVisibleCircleButton = mount(
        <CircleButton onClick={mockClick} visibleOnHover={false}>
          Click me!
        </CircleButton>
      )
      const ovalToJSON = renderer.create(notVisibleCircleButton.find('div').at(1)).toJSON()

      expect(ovalToJSON).toHaveStyleRule('opacity', undefined)
      expect(ovalToJSON).toHaveStyleRule('transform', undefined)
    })
  })
})
