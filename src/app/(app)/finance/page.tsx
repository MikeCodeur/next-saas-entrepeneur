import {getUserIdDal} from '@/app/dal/user-dal'
import FinanceYearSelect from '@/components/dashboard/trackers/finance/finance-year-select'
import FinanceDataTable from '@/components/dashboard/trackers/finance/finance-data-table'
import {Separator} from '@/components/ui/separator'
import {
  getFinancesChartByYear,
  getFinancesWithPaginationByYear,
  getYearsFinancesByUid,
} from '@/services/finance-service'
import {DATA_ROWS_PER_PAGE} from '@/utils/constants'
import {notFound} from 'next/navigation'
import React from 'react'
import {formatedFinanceData} from '@/components/charts/chart-utils'
import FinanceLineChart from '@/components/dashboard/trackers/finance/finance-line-chart'
import FinanceDashboard from './finance-dashboard'

type SearchParams = Promise<{
  financeYear?: string
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const userId = await getUserIdDal()
  if (!userId) notFound()

  const params = await props.searchParams

  return (
    <FinanceDashboard
      financeYear={params?.financeYear}
      page={params?.page}
      pageSize={params?.pageSize}
      userId={userId}
    />
  )
}

export default Page
