import React, { useEffect } from 'react'
import { GlyphChevronDownIcon } from 'components/Icon'
import { Wrapper, StyledHeader, StyledCollapse, StyledBody, StyledItemBadge } from './styles'
import ReactHtmlParser from 'react-html-parser'
/**
 * Collapsible element
 *
 * @param {String} title to render header of the collapsible element
 * @param {Boolean} collapsed
 * @param {Aray<React.Component>} children to render in collapsed area
 */
export const Collapsible = ({ title, collapsed = true, badge = '', children }) => {
  const ref = React.createRef()
  const ref2 = React.createRef()

  useEffect(() => {
    if (!collapsed) {
      ref.current.style.height = `${ref.current.scrollHeight}px`
    } else {
      ref.current.style.height = `0px`
      ref.current.style.marginTop = '0px'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed])

  const toggleCollapse = () => {
    if (ref.current.style.height !== '0px') {
      ref.current.style.height = '0px'
      ref2.current.style.transform = 'rotate(360deg)'
    } else {
      ref.current.style.height = `${ref.current.scrollHeight}px`
      ref2.current.style.transform = 'rotate(180deg)'
    }
  }

  return (
    <StyledCollapse>
      <StyledHeader onClick={toggleCollapse}>
        {title}
        {badge && <StyledItemBadge>{badge}</StyledItemBadge>}
        <span ref={ref2}>
          <GlyphChevronDownIcon />
        </span>
      </StyledHeader>
      <StyledBody
        ref={ref}
        style={{
          overflow: 'hidden',
          transition: 'height 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }}
        onClick={toggleCollapse}
      >
        {children}
      </StyledBody>
    </StyledCollapse>
  )
}

/**
 * Uses Array of Collapsible elements
 *
 * @param {Array<{ label: String, value: String }>} descriptions
 */
const ExpansionPanelWrapper = ({ descriptions }) => {
  return (
    <Wrapper>
      {descriptions.map((description, i) => (
        <Collapsible key={i} title={description.label}>
          {ReactHtmlParser(description.value || 'No information found')}
        </Collapsible>
      ))}
    </Wrapper>
  )
}

export default ExpansionPanelWrapper
