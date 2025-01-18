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
  const {onClose, setModal, onOpen} = useModal()

  const FormAdd: React.ComponentType<{
    onClose: () => void
    uid?: string
  }> =
    trackerType === 'finance'
      ? (CreateEditFinanceForm as typeof FormAdd)
      : (CreateEditHealthForm as typeof FormAdd)

  return (
    <Button
      variant="outline"
      className="ml-4 w-fit md:ml-0"
      onClick={() => {
        setModal({
          title: `Nouvelle ligne ${trackerType}`,
          children: <FormAdd onClose={onClose} uid={uid} />,
        })
        onOpen()
      }}
    >
      <PlusCircle className="mr-2 size-6" />
      {label}
    </Button>
  )
}

export default NewLineButton
