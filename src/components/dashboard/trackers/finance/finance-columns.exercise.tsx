'use client'
//1. 🚀 Shadcn Data Table (Tanstack)
import {Badge} from '@/components/ui/badge'
import type {ColumnDef} from '@tanstack/react-table'
import {DataTableColumnHeader} from '@/components/ui/data-table-column-header'
import {DataTableRowActions} from '@/components/ui/data-table-row-actions'
import {Finance, FinanceDTO} from '@/types/domain/finance-types'
import {formattedDate} from '@/utils/date-utils'

export const financeColumns: ColumnDef<Finance>[] = [
  {
    accessorKey: 'date',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({row}) => {
      const date = new Date(row.getValue('date'))
      const formatted = formattedDate(date)
      return <div className="min-w-fit text-left md:w-[200px]">{formatted}</div>
    },
    filterFn: (row, date, value) => {
      return value.includes(row.getValue(date))
    },
  },
  // 🐶 Ajoute la colonne 'amount'

  {
    accessorKey: 'amount',
    header: ({column}) => (
      <></> // 🐶 Utilise : <DataTableColumnHeader column={column} title="Montant" />
    ),
    cell: ({row}) => {
      // 🐶 formate correctement le montant
      //
      // const amount = Number.parseFloat(row.getValue('amount'))
      // const formatted = new Intl.NumberFormat('fr-FR', {
      //   style: 'currency',
      //   currency: 'EUR',
      // }).format(amount)
      return <></> //<div className="min-w-fit text-left">{formatted}</div>
    },
    filterFn: (row, amount, value) => {
      // 🐶 filtre correctement le montant
      return value.includes(row.getValue(amount))
    },
  },
  // 🐶 Ajoute la colonne 'label'

  // {
  //   accessorKey: 'label',
  //   header: ({column}) => (
  //       ...
  //   ),
  //   cell: ({row}) => {
  //     ...
  //   },
  //   filterFn: (row, amount, value) => {
  //    ...
  //   },
  // },

  // 🐶 Ajoute la colonne 'category'
  // {
  //   accessorKey: 'category',
  //   header: ({column}) => (
  //     ...
  //   ),
  //   cell: ({row}) => {
  //     ...
  //   },
  //   filterFn: (row, amount, value) => {
  //     ...
  //   },
  // },

  // 🐶 Ajoute la colonne 'actions' urtilise  <DataTableRowActions data={{...row.original}} />
  // {
  //   id: 'actions',
  //   cell: ({row}) => {
  //     return (
  //       <div className="min-w-fit text-right md:ml-0 md:px-8">
  //         <DataTableRowActions data={{...row.original}} />
  //       </div>
  //     )
  //   },
  // },
]
