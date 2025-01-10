"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import {Dispatch, ReactNode, createContext, useContext, useState} from "react"

import {useDisclosure} from "@/app/components/hooks/use-disclosure"

type ModalContent = {
  title: string
}
type ModalContextProps = {
  modal:
    | (ModalContent & {
        children: ReactNode
      })
    | undefined
  setModal: Dispatch<
    ModalContent & {
      children: ReactNode
    }
  >
}
const ModalContext = createContext<{
  modal: ModalContextProps["modal"]
  setModal: ModalContextProps["setModal"]
  onOpen: () => void
  onClose: () => void
}>({
  modal: undefined,
  setModal: () => {},
  onOpen: () => {},
  onClose: () => {},
})

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modal, setModal] = useState<ModalContextProps["modal"]>()
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

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider")
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
