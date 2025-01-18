import {ChartBodySkeleton} from '@/components/dashboard/skeletons/chart-skeleton'
import DashBoardHeaderSkeleton from '@/components/dashboard/skeletons/dashboard-header-skeleton'
import DataTableSkeleton from '@/components/dashboard/skeletons/data-table-skeleton'

const Loading = () => {
  return (
    <div className="h-full w-full">
      <DashBoardHeaderSkeleton />
      <div className="space-y-4">
        <ChartBodySkeleton />
        <DataTableSkeleton />
      </div>
    </div>
  )
}

export default Loading
