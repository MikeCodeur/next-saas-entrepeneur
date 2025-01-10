"use client"

import {DataTable, Pagination} from "@/app/components/ui/data-table"

import type {ColumnDef} from "@tanstack/react-table"
import {Finance, FinanceDTO} from "@/types/domain/finance-types"
import getDataColumn from "../get-data-columns"

type FinanceDataTableClientProps = {
  isGranted: boolean
  uid: string
  financeTable: {
    data: FinanceDTO[]
    pagination: Pagination
  }
}
const FinanceDataTableClient = ({
  isGranted,
  uid,
  financeTable,
}: FinanceDataTableClientProps) => {
  const financeColums = getDataColumn(
    isGranted,
    "finance",
    uid
  ) as ColumnDef<Finance>[]
  return <DataTable columns={financeColums} dataTable={financeTable} />
}

export default FinanceDataTableClient
