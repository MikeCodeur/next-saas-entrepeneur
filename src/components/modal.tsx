'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Dispatch,
  ReactNode,
  createContext,
  use,
  useContext,
  useState,
} from 'react'

import {useDisclosure} from '@/components/hooks/use-disclosure'

type ModalContent = {
  title: string
  children: ReactNode
}

type ModalContextType = {
  modal: ModalContent | undefined
  setModal: (modal: ModalContent | undefined) => void
  onOpen: () => void
  onClose: () => void
}

const ModalContext = createContext<ModalContextType>({
  modal: undefined,
  setModal: () => {},
  onOpen: () => {},
  onClose: () => {},
})

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modal, setModal] = useState<ModalContent | undefined>()
  const {isOpen, onOpen, onClose, setIsOpen} = useDisclosure()

  return (
    <ModalContext.Provider value={{modal, setModal, onOpen, onClose}}>
      {children}
      {modal && (
        <Modal title={modal.title} disclosure={{isOpen, onOpen: setIsOpen}}>
          {modal.children}
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = use(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}

type ModalProps = ModalContent & {
  children: ReactNode
  disclosure: {
    isOpen: boolean
    onOpen: (open: boolean) => void
  }
}
const Modal = ({title, children, disclosure}: ModalProps) => {
  return (
    <Dialog open={disclosure.isOpen} onOpenChange={disclosure.onOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-base uppercase">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
export default Modal
