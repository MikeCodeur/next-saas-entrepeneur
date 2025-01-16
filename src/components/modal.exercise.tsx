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
//⛏️ supprime <object> et remplace par ModalContextType
const ModalContext = createContext<object>({
  // 🐶 créé les valeurs par défaut du context
  // modal:
  // setModal:
  // onOpen:
  // onClose:
})

// 🐶 créé le provider
export const ModalProvider = ({children}: {children: ReactNode}) => {
  // 🐶 créé le state qui contient la modal
  const [modal, setModal] = ['', '']
  // 🤖 const [modal, setModal] = useState ...

  // 🐶 utilise  le hook 'useDisclosure'
  const {isOpen, onOpen, onClose, setIsOpen} = useDisclosure()

  return (
    //🐶 passe en props de value {modal, setModal, onOpen, onClose}
    <ModalContext.Provider value={{modal, setModal, onOpen, onClose}}>
      {children}
      {/* 🐶 Créé le composant Modal plus pas pour l'utiliser ici */}
      {/* {modal && (
        <Modal title={modal.title} disclosure={{isOpen, onOpen: setIsOpen}}>
          {modal.children}
        </Modal>
      )} */}
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
  // 🐶 utilise le composant Dialog de chadscn pour customiser la modal
  //https://ui.shadcn.com/docs/components/dialog
  return (
    <Dialog open={disclosure.isOpen} onOpenChange={disclosure.onOpen}>
      {/* <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-base uppercase">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent> */}
    </Dialog>
  )
}
export default Modal
