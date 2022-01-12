import { FunctionComponent, ReactNode } from 'react'
import { H4, Modal, ModalBody, ModalHeader } from '@tourlane/tourlane-ui'

interface DialogueProps {
  isOpen: boolean
  onClose: () => void
  hasHeader?: boolean
  header?: string
  children: ReactNode
}

const Dialogue: FunctionComponent<DialogueProps> = ({
  children,
  isOpen,
  onClose,
  hasHeader,
  header
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {hasHeader && (
        <ModalHeader>
          <H4>{header}</H4>
        </ModalHeader>
      )}
      <ModalBody>{children}</ModalBody>
    </Modal>
  )
}

export default Dialogue
