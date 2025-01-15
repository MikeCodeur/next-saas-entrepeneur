import {getUserIdDal} from '@/app/dal/user-dal'
import FinanceYearSelect from '@/components/dashboard/trackers/finance/finance-year-select'
import FinanceDataTable from '@/components/dashboard/trackers/finance/finance-data-table'
import {Card} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {canCreateFinance} from '@/services/authorization/finance-authorization'
import {
  getFinancesWithPaginationByYear,
  getYearsFinancesByUid,
} from '@/services/finance-service.final'
import {DATA_ROWS_PER_PAGE} from '@/utils/constants'
import {notFound} from 'next/navigation'
import React from 'react'

type SearchParams = Promise<{
  financeYear?: string
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const userId = await getUserIdDal()
  if (!userId) notFound()

  const params = await props.searchParams
  const defaultYear = new Date().getFullYear().toString()
  const financeYear = params?.financeYear ?? defaultYear
  const page = Number(params?.page) || 1
  const limit = Number(params?.pageSize) || DATA_ROWS_PER_PAGE

  //services
  const years = (await getYearsFinancesByUid(userId)) ?? [{year: defaultYear}]
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

      {finances.data.map((finance) => (
        <div key={finance.id}>{finance.label}</div>
      ))}

      {years?.map((finance) => <div key={finance.year}>{finance.year}</div>)}
    </div>
  )
}

export default Page
