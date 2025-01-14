import {ChartSkeleton} from '../skeletons/chart-skeleton'
import DataTableSkeleton from '../skeletons/data-table-skeleton'
import FinanceChart from './finance-chart'
import FinanceChartTrigger from './finance-chart-trigger'

import {Separator} from '@/components/ui/separator'
import {Suspense} from 'react'
import FinanceDataTable from './finance-data-table'

type FinanceDashboardProps = {
  financeYear?: string
  page: number
  years?: {
    year: string
  }[]
  uid: string
}
const FinanceDashboard = ({
  financeYear,
  years,
  uid,
  page,
}: FinanceDashboardProps) => {
  const hasYear = !!years
  console.log('hasYear', hasYear)
  if (!hasYear) {
    return (
      <div className="flex w-full flex-col justify-center gap-4 pb-4">
        <h1 className="text-2xl font-semibold">Finance</h1>
        <Separator className="my-4" />
        <Suspense fallback={<DataTableSkeleton />}>
          <FinanceDataTable year={undefined} uid={uid} page={page} />
        </Suspense>
      </div>
    )
  }

  const hasCurrentYear = years?.find((year) => year.year === financeYear)?.year
  const currentYear = hasCurrentYear
    ? financeYear
    : years?.[0].year ?? undefined

  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Finance</h1>
      <Separator className="my-4" />
      {hasYear && (
        <FinanceChartTrigger years={years} currentYear={currentYear}>
          <FinanceChart year={currentYear} uid={uid} />
          {/* <Suspense fallback={<ChartSkeleton />}>
            <FinanceChart year={currentYear} uid={uid} />
          </Suspense> */}
        </FinanceChartTrigger>
      )}
      <Suspense fallback={<DataTableSkeleton />}>
        <FinanceDataTable year={currentYear} uid={uid} page={page} />
      </Suspense>
    </div>
  )
}

export default FinanceDashboard
