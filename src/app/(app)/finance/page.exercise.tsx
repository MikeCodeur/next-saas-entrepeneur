import {getUserIdDal} from '@/app/dal/user-dal'
import FinanceDataTable from '@/components/dashboard/trackers/finance/finance-data-table'
import {Card} from '@/components/ui/card'
import {canCreateFinance} from '@/services/authorization/finance-authorization'
import {getFinancesWithPaginationByYear} from '@/services/finance-service.final'
import {DATA_ROWS_PER_PAGE} from '@/utils/constants'
import {notFound} from 'next/navigation'
import React from 'react'

type SearchParams = Promise<{
  financeYear?: string
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const params = await props.searchParams
  const financeYear = params?.financeYear ?? '2024'
  const page = Number(params?.page) || 1
  const limit = Number(params?.pageSize) || DATA_ROWS_PER_PAGE
  const userId = await getUserIdDal()
  if (!userId) notFound()
  const isGranted = await canCreateFinance(userId)

  const finances = await getFinancesWithPaginationByYear(
    financeYear,
    userId,
    page,
    limit
  )
  return (
    <Card className="flex w-full flex-col space-y-4 py-4 md:items-start md:px-8">
      <FinanceDataTable
        isGranted={isGranted}
        uid={userId}
        financeTable={finances}
      />
    </Card>
  )
}

export default Page
