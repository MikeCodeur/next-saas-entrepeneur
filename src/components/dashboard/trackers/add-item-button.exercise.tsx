'use client'
import React from 'react'
import {Button} from '@/components/ui/button'
import {PlusCircle} from 'lucide-react'

import {useModal} from '@/components/modal'
import {useParams} from 'next/navigation'
import {TrackerType} from '@/utils/constants'
import CreateEditFinanceForm from './finance/forms/create-edit-finance-form'
import CreateEditHealthForm from './health/forms/create-edit-health-form'

const NewLineButton = ({
  trackerType,
  uid,
  label,
}: {
  trackerType: TrackerType
  uid: string
  label: string
}) => {
  // 🐶 utilise le hook useModal
  // 🤖 const {onClose, setModal, onOpen} = useModal()

  // 🐶 fais en sorte que FormAdd soit le bon composant en fonction du trackerType
  // 🤖
  // const FormAdd: React.ComponentType<{
  //   onClose: () => void
  //   uid?: string
  // }> =

  return (
    <></>
    // 🐶 créé un bouton qui ouvre la modal
    // 🤖
    // <Button
    //   variant="outline"
    //   className="ml-4 w-fit md:ml-0"
    //   onClick={() => {
    //    // 🐶 setModal avec le bon titre et le bon composant children
    //    // 🐶 onOpen
    //   }}
    // >
    //   <PlusCircle className="mr-2 size-6" />
    //   {label}
    // </Button>
  )
}

export default NewLineButton
