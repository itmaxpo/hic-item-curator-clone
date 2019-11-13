import React from 'react'
import LazyLoader from 'components/LazyLoader'

const getImageUrlWithParams = (url, width, height, fit) =>
  `${process.env.REACT_APP_IMGIX_URL}/${encodeURI(
    url
  )}?w=${width}&h=${height}&fit=${fit}&crop=edges&auto=format&auto=enhance&vib=70`

const ResizedImage = ({ src: _src, alt, width, height, fit = 'crop', ...props }) => {
  const src = getImageUrlWithParams(_src, width, height, fit)

  return (
    <LazyLoader src={src} height={height} isLoading={props.isLoading}>
      <img alt={alt} src={src} {...props} />
    </LazyLoader>
  )
}

export default ResizedImage
