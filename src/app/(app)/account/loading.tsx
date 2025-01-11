import {Card} from '@/components/ui/card'
import DashBoardHeaderSkeleton from '@/components/dashboard/skeletons/dashboard-header-skeleton'
import {Skeleton} from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="h-full w-full">
      <DashBoardHeaderSkeleton />
      <Card className="flex flex-col gap-4">
        <div className="space-y-8 p-4">
          {Array.from({length: 2}).map((_, index) => (
            <div className="space-y-2" key={index}>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-6 w-64" />
            </div>
          ))}
          <Skeleton className="h-10 w-32" />
        </div>
      </Card>
    </div>
  )
}

export default Loading
