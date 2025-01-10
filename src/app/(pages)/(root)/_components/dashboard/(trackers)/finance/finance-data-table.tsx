import {Card} from "@/app/components/ui/card"
import FinanceDataTableClient from "./finance-data-table-client"
import NewLineButton from "../new-line-button"

import {notFound} from "next/navigation"
import {getFinancesByYearDal} from "@/app/dal/finance-dal"
import {canCreateFinance} from "@/services/authorization/service-authorizations/finance-authorization"
import {getUserIdDal} from "@/app/dal/user-dal"

type FinanceDataTableProps = {
  year: string | undefined
  uid?: string
  page: number
}
const FinanceDataTable = async ({year, uid, page}: FinanceDataTableProps) => {
  console.log("uid", uid)
  if (!uid) notFound()
  const userId = await getUserIdDal()
  console.log("userId 2", userId)
  const isGranted = await canCreateFinance(uid)
  // console.log("isGranted FinanceDataTable", isGranted)
  const wording = "Tracker une dépense / revenu"
  const hasYear = !!year

  if (!hasYear) {
    return (
      <Card className="flex w-full flex-col space-y-2 py-4 md:items-start md:px-8">
        {isGranted && (
          <NewLineButton trackerName="finance" uid={uid} wording={wording} />
        )}
        <p className="px-4 text-center">Aucune donnée</p>
      </Card>
    )
  }
  const financesTable = await getFinancesByYearDal(year, page, uid)

  return (
    <Card className="flex w-full flex-col space-y-4 py-4 md:items-start md:px-8">
      {isGranted && (
        <NewLineButton trackerName="finance" uid={uid} wording={wording} />
      )}
      <FinanceDataTableClient
        isGranted={isGranted}
        uid={uid}
        financeTable={financesTable}
      />
    </Card>
  )
}

export default FinanceDataTable
