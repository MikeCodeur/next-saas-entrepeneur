'use client'

import {DataTable, Pagination} from '@/components/ui/data-table'

import {HealthDTO} from '@/types/domain/health-types'
import {healthColumns} from './health-columns'
import AddItemButton from '../add-item-button'
import {Card} from '@/components/ui/card'

type HealthDataTableClientProps = {
  healthTable: {
    data: HealthDTO[]
    pagination: Pagination
  }
  uid: string
}
const HealthDataTableClient = ({
  healthTable,
  uid,
}: HealthDataTableClientProps) => {
  const label = 'Tracker un élément de santé'
  //🐶 Vérifie si l'utilisateur a les permissions avec 'canCreateHealth'
  // Conditionne l'affichage du bouton 'AddItemButton'
  return (
    <Card className="flex w-full flex-col space-y-2 py-4 md:items-start md:px-8">
      <AddItemButton trackerType="health" uid={uid} label={label} />
      <DataTable columns={healthColumns} dataTable={healthTable} />
    </Card>
  )
}

export default HealthDataTableClient
