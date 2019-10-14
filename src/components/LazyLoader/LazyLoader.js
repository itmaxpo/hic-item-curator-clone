import React, { useState, useEffect } from 'react'
import { Wrapper, Preloader, StyledBlurInTransition } from './styles'

/**
 * LazyLoader component
 * Meant to show a loading spinner while the image loads
 *
 * @name LazyLoader
 * @param {Function} onLoad
 * @param {String} src
 * @param {Object} children
 * @returns {Object} Lazy Loader
 */
const LazyLoader = ({ onLoad = () => null, src, isLoading, children, ...props }) => {
  const [isLoaded, setLoaded] = useState(true)
  const [errors, setErrors] = useState([])
  const [isVertical, setIsVertical] = useState(false)

  // We are using this function to figure out if image is vertically or horizontally aligned
  const getDimensions = ({ target }) => {
    setIsVertical(target.naturalHeight > target.naturalWidth)
  }

  useEffect(() => {
    // clean all initial values
    setLoaded(false)
    setErrors([])

    // define loading functions
    const loadImage = (imageSrc, callback) => {
      const img = new Image()
      img.onload = e => {
        getDimensions(e)
        callback(null)
      }

      img.onerror = () => callback(new Error('Failed to load an image'))
      img.src = imageSrc
    }
    const loadImages = src => {
      const imagesSrc = typeof src === 'string' ? [src] : src
      imagesSrc.forEach((imageSrc, index) => {
        loadImage(imageSrc, error => {
          // Set loading error
          setErrors(errors =>
            imagesSrc.reduce((acc, value, i) => {
              acc[i] = i === index ? error : errors[i]
              return acc
            }, [])
          )
        })
      })
    }

    // kick-off loading
    loadImages(src)
  }, [src])

  useEffect(() => {
    // Define if loading is done
    const imagesSrc = typeof src === 'string' ? [src] : src
    if (errors.filter(error => error !== undefined).length === imagesSrc.length) {
      setLoaded(true)
    }

    if (isLoading) {
      setLoaded(false)
    }
  }, [errors, src, isLoading])

  useEffect(() => {
    onLoad(isLoaded)
  }, [isLoaded, onLoad])

  return (
    <Wrapper {...props}>
      {isLoaded && (
        <StyledBlurInTransition isVertical={isVertical} animationDuration="1000ms">
          {children}
        </StyledBlurInTransition>
      )}
      {!isLoaded && <Preloader />}
      {props.isLoading && <Preloader />}
    </Wrapper>
  )
}

export default LazyLoader
