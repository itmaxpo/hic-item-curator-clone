import { FC } from 'react'

import { Hr, Flex } from '@tourlane/tourlane-ui'

import { PageProps } from 'types/PageProps'
import Description from '../Description'
import Images from '../Images'
import Information from '../Information'
import Intro from '../Intro'

const CountryPage: FC<PageProps> = ({
  onChange,
  isEditing,
  isLoadingAdditionalInfo,
  onGeolocationUpdate,
  onImagesAdd,
  offer_preview,
  description,
  descriptionInspiration,
  type,
  ...item
}) => (
  <>
    <Intro onChange={onChange} isEditing={isEditing} offerPreview={offer_preview} />

    <Flex direction="column" mt={40} gap={40}>
      <Hr />

      <Description
        {...item}
        onChange={onChange}
        isEditing={isEditing}
        type={type}
        description={description}
        descriptionInspiration={descriptionInspiration}
      />

      <Hr />
      <Images isEditing={isEditing} item={item} onChange={onChange} onImagesAdd={onImagesAdd} />

      <Hr />

      <Information onChange={onChange} item={item} type={type} isEditing={isEditing} />
    </Flex>
  </>
)

export default CountryPage
