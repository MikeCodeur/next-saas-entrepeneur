'use client'
// 2. 🚀 Modal dans une table (Update / Delete Item)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {Button} from '@/components/ui/button'
import {Finance} from '@/types/domain/finance-types'
import {MoreHorizontal} from 'lucide-react'

type DataTableRowActionsProps = {
  data: Finance
  type: 'finance' | 'health'
}
export const DataTableRowActions = ({data, type}: DataTableRowActionsProps) => {
  const trackerName = type

  // 🐶 Utilise le hook useModal
  //  const {setModal, onOpen, onClose} = useModal()

  // 🐶 Crée deux composants de formulaire en fonction du type de tracker
  // 1. FormUpdate (CreateEditFinanceForm ou CreateEditHealthForm)
  // 2. FormDelete (DeleteFinanceForm ou DeleteHealthForm)
  let FormUpdate: React.ComponentType<{
    onClose: () => void
    data?: typeof data
  }>
  let FormDelete: React.ComponentType<{onClose: () => void; id: string}>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-2">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* 🐶 utilise onClick setModel onOpen pour les actions */}
        <DropdownMenuItem>Editer</DropdownMenuItem>
        <DropdownMenuItem>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
