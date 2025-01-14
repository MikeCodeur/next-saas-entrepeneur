import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'

import {Skeleton} from '@/components/ui/skeleton'

const DataTableSkeleton = () => {
  return (
    <Card className="flex w-full flex-col space-y-2 py-4 md:items-start md:px-8">
      <CardHeader>
        <Skeleton className="h-8 w-36" />
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex flex-col gap-2">
          {Array.from({length: 6}).map((_, index) => (
            <Skeleton className="h-8 w-full" key={index} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="mx-auto flex flex-row flex-wrap justify-center gap-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-32" />
      </CardFooter>
    </Card>
  )
}

export default DataTableSkeleton
