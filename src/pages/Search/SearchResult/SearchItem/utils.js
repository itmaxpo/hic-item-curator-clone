import { getItemAttachmentsById } from 'services/contentApi'
import { filter, get } from 'lodash'

// enriched item with attachments and parent administrative area
export const enrichItem = async item => {
  // add to array if needing to enrich item with different api calls
  const arrayOfPromises = [getItemAttachmentsById(item.id)]

  return await Promise.all(arrayOfPromises).then(values => {
    const [attachmentsResponse] = values

    return {
      ...item,
      ...parseAttachmentsResponse(attachmentsResponse),
      isLoading: false
    }
  })
}

const parseAttachmentsResponse = response => (response ? { allImages: response.data } : null)

export const getCoverImage = images =>
  filter(images, ({ tags }) => get(tags, 'order') === 0 && get(tags, 'visible') === true)[0] ||
  images[0]
