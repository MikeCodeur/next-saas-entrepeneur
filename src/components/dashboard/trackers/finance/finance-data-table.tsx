'use client'

import {DataTable, Pagination} from '@/components/ui/data-table'

import {FinanceDTO} from '@/types/domain/finance-types'
import {financeColumns} from './finance-columns'
import {canCreateFinance} from '@/services/authorization/finance-authorization'

type FinanceDataTableProps = {
  uid: string
  financeTable: {
    data: FinanceDTO[]
    pagination: Pagination
  }
}

const FinanceDataTable = ({financeTable}: FinanceDataTableProps) => {
  return <DataTable columns={financeColumns} dataTable={financeTable} />
}

export default FinanceDataTable
