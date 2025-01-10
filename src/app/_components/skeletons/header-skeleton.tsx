import {Skeleton} from '@/components/ui/skeleton'

const HeaderSkeleton = () => {
  return (
    <div className="flex h-14 items-center px-4 lg:px-6">
      <div className="flex items-center justify-center gap-x-2">
        <Skeleton className="size-8" />
        <Skeleton className="h-8 w-36" />
      </div>
      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="size-10" />
      </div>
    </div>
  )
}

export default HeaderSkeleton
