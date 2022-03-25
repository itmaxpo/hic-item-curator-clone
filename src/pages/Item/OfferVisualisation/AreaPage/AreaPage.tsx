import { FC } from 'react'

import { Hr, Flex } from '@tourlane/tourlane-ui'

import { PageProps } from 'types/PageProps'
import Location from '../Location'
import Intro from '../Intro'
import Images from '../Images'
import Information from '../Information'
import Description from '../Description'

const AreaPage: FC<PageProps> = ({
  onChange,
  isEditing,
  isLoadingAdditionalInfo,
  onGeolocationUpdate,
  onImagesAdd,
  offer_preview,
  type,
  description,
  descriptionInspiration,
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

      <Location
        item={item as PageProps}
        isEditing={isEditing as boolean}
        isLoadingAdditionalInfo={isLoadingAdditionalInfo as boolean}
        onGeolocationUpdate={onGeolocationUpdate as () => void}
      />

      <Hr />

      <Information onChange={onChange} item={item} type={type} isEditing={isEditing} />
    </Flex>
  </>
)

export default AreaPage
