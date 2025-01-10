import {Separator} from "@/app/components/ui/separator"
import {Skeleton} from "@/app/components/ui/skeleton"

const DashBoardHeaderSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-28" />
      <Separator className="my-4" />
    </>
  )
}

export default DashBoardHeaderSkeleton
