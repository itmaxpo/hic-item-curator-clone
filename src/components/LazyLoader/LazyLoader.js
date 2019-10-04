import React, { useState, useEffect } from 'react'
import { BlurInTransition } from '@tourlane/tourlane-ui'
import { Wrapper, Preloader } from './styles'

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

  useEffect(() => {
    // clean all initial values
    setLoaded(false)
    setErrors([])

    // define loading functions
    const loadImage = (imageSrc, callback) => {
      const img = new Image()
      img.onload = () => callback(null)
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
      {isLoaded && <BlurInTransition animationDuration="1000ms">{children}</BlurInTransition>}
      {!isLoaded && <Preloader />}
      {props.isLoading && <Preloader />}
    </Wrapper>
  )
}

export default LazyLoader
