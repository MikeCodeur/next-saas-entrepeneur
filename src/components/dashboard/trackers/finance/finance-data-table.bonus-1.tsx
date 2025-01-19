import {DataTable, Pagination} from '@/components/ui/data-table'

import {FinanceDTO} from '@/types/domain/finance-types'
import {financeColumns, financeColumnsGranted} from './finance-columns'
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

const FinanceDataTable = async ({finances, uid}: FinanceDataTableProps) => {
  const label = 'Tracker une dépense / revenu'
  const canCreate = await canCreateFinance(uid)
  const columns = canCreate ? financeColumnsGranted : financeColumns
  return (
    <Card className="flex w-full flex-col space-y-2 py-4 md:items-start md:px-8">
      {canCreate && (
        <AddItemButton trackerType="finance" uid={uid} label={label} />
      )}
      <DataTable columns={columns} dataTable={finances} />
    </Card>
  )
}

export default FinanceDataTable
