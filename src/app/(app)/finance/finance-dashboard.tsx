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
import {getFinancesByYearDal} from '@/app/dal/finance-dal'

type FinanceDashboardProps = {
  financeYear?: string
  page?: string
  pageSize?: string
  userId?: string
}

const FinanceDashboard = async (props: FinanceDashboardProps) => {
  const userId = props.userId
  if (!userId) notFound()

  const params = props
  const defaultYear = new Date().getFullYear().toString()

  const page = Number(params?.page) || 1
  const limit = Number(params?.pageSize) || DATA_ROWS_PER_PAGE

  const years = (await getYearsFinancesByUid(userId)) ?? [
    {year: new Date().getFullYear().toString()},
  ]

  const requestedYear = params?.financeYear
  // Si l'année demandée existe dans `years`, on l'utilise, sinon on prend la première année disponible
  const financeYear =
    requestedYear && years.some((y) => y.year === requestedYear)
      ? requestedYear
      : years?.[0]?.year || defaultYear

  const hasCurrentYear = years?.find((year) => year.year === financeYear)?.year

  const finances = await getFinancesByYearDal(financeYear, userId, page, limit)

  const financesForChart = await getFinancesChartByYear(financeYear, userId)
  const financeFormatted = formatedFinanceData(financesForChart, 'month')

  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Finance</h1>
      <Separator className="my-4" />

      <FinanceYearSelect years={years} currentYear={financeYear}>
        <FinanceLineChart data={financeFormatted} />

        {hasCurrentYear ? (
          <FinanceDataTable finances={finances} uid={userId} />
        ) : (
          <div>No data for this year</div>
        )}
      </FinanceYearSelect>
    </div>
  )
}

export default FinanceDashboard
