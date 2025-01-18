import {getUserIdDal} from '@/app/dal/user-dal'
import {Separator} from '@/components/ui/separator'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'
import FinanceChart from './components/finance-chart'
import HealthChart from './components/health-chart'
import {ChartBodySkeleton} from '@/components/dashboard/skeletons/chart-skeleton'

type SearchParams = Promise<{
  financeYear?: string
  healthYear?: string
  healthWeek?: string
}>

export default async function Page(props: {searchParams?: SearchParams}) {
  const searchParams = await props.searchParams
  const userId = await getUserIdDal()
  if (!userId) notFound()

  return (
    <div className="flex w-full flex-col justify-center gap-8 pb-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Separator className="my-4" />

      <div className="space-y-8">
        <Suspense fallback={<ChartBodySkeleton />}>
          <FinanceChart
            userId={userId}
            financeYear={searchParams?.financeYear}
          />
        </Suspense>

        <Suspense fallback={<ChartBodySkeleton />}>
          <HealthChart
            userId={userId}
            healthYear={searchParams?.healthYear}
            healthWeek={searchParams?.healthWeek}
          />
        </Suspense>
      </div>
    </div>
  )
}
