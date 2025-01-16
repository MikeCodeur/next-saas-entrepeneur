'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {MoreHorizontal} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Finance} from '@/types/domain/finance-types'
import {Health} from '@/types/domain/health-types'
import {useModal} from '@/components/modal'
import CreateEditFinanceForm from '../dashboard/trackers/finance/forms/create-edit-finance-form'
import CreateEditHealthForm from '../dashboard/trackers/health/forms/create-edit-health-form'
import DeleteFinanceForm from '../dashboard/trackers/finance/forms/delete-finance-form'
import DeleteHealthForm from '../dashboard/trackers/health/forms/delete-health-form'

type DataTableRowActionsProps = {
  data: Finance | Health
  type: 'finance' | 'health'
}

export const DataTableRowActions = ({data, type}: DataTableRowActionsProps) => {
  const trackerName = type
  const {setModal, onOpen, onClose} = useModal()

  let FormUpdate: React.ComponentType<{
    onClose: () => void
    data?: typeof data
  }>
  let FormDelete: React.ComponentType<{onClose: () => void; id: string}>

  if (type === 'finance') {
    FormUpdate = CreateEditFinanceForm as typeof FormUpdate
    FormDelete = DeleteFinanceForm
  } else {
    FormUpdate = CreateEditHealthForm as typeof FormUpdate
    FormDelete = DeleteHealthForm
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-2">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setModal({
              title: `Editer ${trackerName}`,
              children: <FormUpdate onClose={onClose} data={data} />,
            })
            onOpen()
          }}
        >
          Editer
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setModal({
              title: `Supprimer ${trackerName}`,
              children: <FormDelete onClose={onClose} id={data.id} />,
            })
            onOpen()
          }}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default DataTableRowActions
