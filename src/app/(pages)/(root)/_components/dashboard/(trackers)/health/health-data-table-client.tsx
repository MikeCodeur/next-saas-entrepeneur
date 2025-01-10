"use client"

import {DataTable, Pagination} from "@/app/components/ui/data-table"

import type {ColumnDef} from "@tanstack/react-table"
import {HealthDTO} from "@/types/domain/health-types"
import getDataColumn from "../get-data-columns"

type HealthDataTableClientProps = {
  isGranted: boolean
  uid: string
  healthTable: {
    data: HealthDTO[]
    pagination: Pagination
  }
}
const HealthDataTableClient = ({
  isGranted,
  uid,
  healthTable,
}: HealthDataTableClientProps) => {
  const healthColums = getDataColumn(
    isGranted,
    "health",
    uid
  ) as ColumnDef<HealthDTO>[]
  return <DataTable columns={healthColums} dataTable={healthTable} />
}

export default HealthDataTableClient
