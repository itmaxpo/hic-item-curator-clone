import React, { useState } from 'react'
import ImageUploader from 'components/ImageUploader'
import { Button } from '@tourlane/tourlane-ui'

/**
 * This is an example of the ImageUploader components put together
 *
 * @name ImageUploaderExample
 * @returns {Object} ImageUploader Example
 */
const ImageUploaderExample = () => {
  const [isEditing, setIsEditing] = useState(false)

  const onImagesUpdate = items => {}

  const onEditingChange = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <Button onClick={onEditingChange}>Editing mode</Button>
      <ImageUploader
        itemId={mockedItem.id}
        isEditing={isEditing}
        images={mockedItem.offerVisualisation.photos}
        onImagesUpdate={onImagesUpdate}
      />
    </>
  )
}

export default ImageUploaderExample

// Mocked item to play with
const mockedItem = {
  id: '123',
  title: 'Arakur Ushuaia & Resort',
  type: 'accommodation',
  language: 'DE',
  suppliers: [1, 2],
  offerVisualisation: {
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia <ul><li>1</li><li>2</li></ul>deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.</b>
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.</b>
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.</b>
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    location: {
      lat: 50.4520886,
      lng: 30.590911000000006,
      name: 'Some address',
      info: 'Some description'
    },
    rooms: [
      { type: 'Queen Room', mealbase: 'MB INFO', description: 'Some stuff about queens' },
      { type: 'King Room', mealbase: 'MB INFO', description: 'Some stuff about kings' },
      { type: 'Prince Room', mealbase: '', description: 'Some stuff about princs' }
    ],
    allImages: [
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/travel'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/man'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/woman'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/dance'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/house'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/nature'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/sea'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/dance'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/house'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/nature'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/sea'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/dance'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/house'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/nature'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/sea'
      }
    ],
    visibleImages: []
  }
}
