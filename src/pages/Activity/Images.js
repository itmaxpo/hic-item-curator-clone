import React from 'react'
import { Flex, Upload, Image, Base } from '@tourlane/tourlane-ui'
import { StyledCard } from './styles'

export const Images = ({ images, isEditing }) => (
  <Flex>
    {isEditing ? (
      <Flex flex={1} pr={[24, 24, 30, 36, 48]}>
        <Upload files={[]} onSubmitFiles={() => {}} />
      </Flex>
    ) : null}
    <Flex flex={1}>
      {images.length ? (
        images.map(image => (
          <StyledCard withOverflowHidden withHover size="small">
            <Image src={image.url} alt="" />
          </StyledCard>
        ))
      ) : (
        <Base>No Images</Base>
      )}
    </Flex>
  </Flex>
)
