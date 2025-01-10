import {ChartBodySkeleton} from "@root/_components/dashboard/(trackers)/skeletons/chart-skeleton"
import DashBoardHeaderSkeleton from "@root/_components/dashboard/skeletons/dashboard-header-skeleton"
import DataTableSkeleton from "@root/_components/dashboard/(trackers)/skeletons/data-table-skeleton"

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
