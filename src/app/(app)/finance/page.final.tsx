import {getUserIdDal} from '@/app/dal/user-dal'
import FinanceChartTrigger from '@/components/dashboard/trackers/finance/finance-chart-trigger'
import FinanceDataTable from '@/components/dashboard/trackers/finance/finance-data-table'
import {Card} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
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

  const finances = await getFinancesWithPaginationByYear(
    financeYear,
    userId,
    page,
    limit
  )
  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Finance</h1>
      <Separator className="my-4" />

      <FinanceChartTrigger
        years={[{year: '2024'}, {year: '2025'}]}
        currentYear={financeYear}
      >
        <FinanceDataTable uid={userId} financeTable={finances} />
      </FinanceChartTrigger>
    </div>
  )
}

export default Page
