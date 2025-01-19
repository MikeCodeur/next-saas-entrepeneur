import {DataTable, Pagination} from '@/components/ui/data-table'

import {HealthDTO} from '@/types/domain/health-types'
import {healthColumns, healthColumnsGranted} from './health-columns'
import AddItemButton from '../add-item-button'
import {Card} from '@/components/ui/card'
import {canCreateHealth} from '@/services/authorization/health-authorization'

type HealthDataTableClientProps = {
  healthTable: {
    data: HealthDTO[]
    pagination: Pagination
  }
  uid: string
}
const HealthDataTableClient = async ({
  healthTable,
  uid,
}: HealthDataTableClientProps) => {
  const label = 'Tracker un élément de santé'
  const canCreate = await canCreateHealth(uid)
  const columns = canCreate ? healthColumnsGranted : healthColumns
  return (
    <Card className="flex w-full flex-col space-y-2 py-4 md:items-start md:px-8">
      {canCreate && (
        <AddItemButton trackerType="health" uid={uid} label={label} />
      )}
      <DataTable columns={columns} dataTable={healthTable} />
    </Card>
  )
}

export default HealthDataTableClient
