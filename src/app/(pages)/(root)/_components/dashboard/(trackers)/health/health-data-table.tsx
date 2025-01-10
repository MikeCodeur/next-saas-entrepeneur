import {Card} from "@/app/components/ui/card"
import HealthDataTableClient from "./health-data-table-client"
import NewLineButton from "../new-line-button"

import {getWeekFromLabel} from "@/utils/date-utils"
import {notFound} from "next/navigation"
import {canCreateHealth} from "@/services/authorization/service-authorizations/health-authorization"
import {getHealthsByWeekDal} from "@/app/dal/health-dal"
import {getUserIdDal} from "@/app/dal/user-dal"

type HealthDataTableProps = {
  year: string | undefined
  week: string | undefined
  uid?: string
  page: number
}
const HealthDataTable = async ({
  year,
  week,
  uid,
  page,
}: HealthDataTableProps) => {
  if (!uid) notFound()
  //const userId = await getUserIdDal()
  //if (!userId) notFound()
  const isGranted = await canCreateHealth(uid)
  const wording = "Tracker un élément de santé"
  const hasNothingToDisplay = !year || !week

  if (hasNothingToDisplay) {
    return (
      <Card className="flex w-full flex-col space-y-2 py-4 md:items-start md:px-8">
        {isGranted && (
          <NewLineButton trackerName="health" uid={uid} wording={wording} />
        )}
        <p className="px-4 text-center">Aucune donnée</p>
      </Card>
    )
  }
  console.log("week", week)
  const weekFromlabel = getWeekFromLabel(week, year)
  console.log("getWeekFromLabel", weekFromlabel)
  const healthTable = await getHealthsByWeekDal(weekFromlabel, year, uid, page)
  if (!healthTable) return

  return (
    <Card className="flex w-full flex-col space-y-4 py-4 md:items-start md:px-8">
      {isGranted && (
        <NewLineButton trackerName="health" uid={uid} wording={wording} />
      )}
      <HealthDataTableClient
        isGranted={isGranted}
        uid={uid}
        healthTable={healthTable}
      />
    </Card>
  )
}

export default HealthDataTable
