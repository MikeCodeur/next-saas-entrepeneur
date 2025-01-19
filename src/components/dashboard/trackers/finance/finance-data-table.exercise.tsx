'use client'

import {DataTable, Pagination} from '@/components/ui/data-table'

import {FinanceDTO} from '@/types/domain/finance-types'
import {financeColumns} from './finance-columns'
//🐶 Importe 'canCreateFinance'
import {canCreateFinance} from '@/services/authorization/finance-authorization'
import AddItemButton from '../add-item-button'
import {Card} from '@/components/ui/card'

type FinanceDataTableProps = {
  finances: {
    data: FinanceDTO[]
    pagination: Pagination
  }
  uid: string
}

const FinanceDataTable = ({finances, uid}: FinanceDataTableProps) => {
  const label = 'Tracker une dépense / revenu'
  //🐶 Vérifie si l'utilisateur a les permissions avec 'canCreateFinance'
  // Conditionne l'affichage du bouton 'AddItemButton'
  return (
    <Card className="flex w-full flex-col space-y-2 py-4 md:items-start md:px-8">
      <AddItemButton trackerType="finance" uid={uid} label={label} />
      <DataTable columns={financeColumns} dataTable={finances} />
    </Card>
  )
}

export default FinanceDataTable
