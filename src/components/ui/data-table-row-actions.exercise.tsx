'use client'

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-2">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Editer</DropdownMenuItem>
        <DropdownMenuItem>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
