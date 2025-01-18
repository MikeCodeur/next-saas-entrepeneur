'use client'

import type {ColumnDef} from '@tanstack/react-table'
import {DataTableColumnHeader} from '@/components/ui/data-table-column-header'
import Link from 'next/link'
import {User} from '@/types/domain/user-types'

export const publicColumns: ColumnDef<Partial<User>>[] = [
  {
    accessorKey: 'name',
    header: ({column}) => <DataTableColumnHeader column={column} title="Nom" />,
    cell: ({row}) => {
      const name = row.getValue('name') as string
      return (
        <Link
          className="min-w-fit text-left hover:cursor-pointer md:w-[200px]"
          href={`/public/${row.original.id}/finance`}
        >
          {name}
        </Link>
      )
    },
    filterFn: (row, name, value) => {
      return value.includes(row.getValue(name))
    },
  },
]
