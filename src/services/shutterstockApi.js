import * as queryString from 'query-string'

const ssKey = `${process.env.REACT_APP_SHUTTERSTOCK_CLIENT}`
const ssSecret = `${process.env.REACT_APP_SHUTTERSTOCK_SECRET}`

const basicAuth = () => 'Basic '.concat(window.btoa(`${ssKey}:${ssSecret}`))

const authParameters = {
  headers: {
    Authorization: basicAuth()
  }
}

export const shutterStockImages = (searchQuery, page = 1) => {
  const queryStr = queryString.stringify({ query: searchQuery, image_type: 'photo' })
  const SHUTTERSTOCK_API_ENDPOINT = `https://api.shutterstock.com/v2/images/search?
    query=${queryStr}&page=${page}&per_page=10`

  return fetch(SHUTTERSTOCK_API_ENDPOINT, authParameters)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      return json.data.map(({ id, assets, title, description, models }) => ({
        id,
        mediaUrl: assets.preview.url,
        title,
        description
      }))
    })
    .catch((error) => {
      return error
    })
}
