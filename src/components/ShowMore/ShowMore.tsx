import React, { useState, useRef, useEffect, FormEvent, FC } from 'react'
import { Collapse } from '@material-ui/core'
import TruncateMarkup from 'react-truncate-markup'
import { Wrapper, ButtonWrapper, BlockTextWrapper } from './styles'

interface ICollapsable {
  lines?: number
  height?: string
  size?: string
  collapsed?: boolean
  children: React.ReactNode
}
/**
 * Component serves as a wrapper for the text components, that need to have
 * show more/less text functionality
 *
 * @param height (optional) Provide height of collapsed block
 */
const Collapsable: FC<ICollapsable> = ({ children, lines = 2, height = '60px', size = '18px' }) => {
  // We use 2 states to make sure the collapse transition happens before the
  // text is truncated.
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isTruncated, setIsTruncated] = useState(true)
  // To switch between:
  //   - showing all content
  //   - showing show/more button with Collapsable logic
  const [isDescMoreShown, setIsDescMoreShown] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // We are showing just {chidlren} if scrollHeght of parent
    // is smaller then height provided
    if (ref.current) {
      setIsDescMoreShown(ref.current.scrollHeight > parseInt(height))
    }
  }, [ref, height])

  const toggleLines = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setIsTruncated((v) => !v)

    if (!isCollapsed) {
      setTimeout(() => {
        setIsCollapsed((v) => !v)
      }, 300)
    } else {
      setIsCollapsed((v) => !v)
    }
  }

  return (
    <Wrapper ref={ref} isCollapsed={isCollapsed}>
      {isDescMoreShown ? (
        <Collapse in={!isTruncated} collapsedHeight={height}>
          <TruncateMarkup
            lines={isCollapsed ? lines : 10000000}
            ellipsis={
              <ButtonWrapper>
                ...<button onClick={toggleLines}>{'more'}</button>
              </ButtonWrapper>
            }
          >
            <BlockTextWrapper size={size}>{children}</BlockTextWrapper>
          </TruncateMarkup>
          {!isCollapsed && (
            <ButtonWrapper isCollapsed>
              {''}
              <button onClick={toggleLines}>{'less'}</button>
            </ButtonWrapper>
          )}
        </Collapse>
      ) : (
        <BlockTextWrapper size={size}>{children}</BlockTextWrapper>
      )}
    </Wrapper>
  )
}

export default Collapsable
