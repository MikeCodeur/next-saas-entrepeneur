import {Card, CardContent, CardHeader} from "@/app/components/ui/card"

import {Skeleton} from "@/app/components/ui/skeleton"

export const ChartSkeleton = () => {
  return <Skeleton className="my-2 flex h-80 w-full" />
}

export const ChartBodySkeleton = () => {
  return (
    <Card className="w-full p-4">
      <CardHeader className="space-y-4 py-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-48 rounded-md" />
      </CardHeader>
      <CardContent>
        <ChartSkeleton />
      </CardContent>
    </Card>
  )
}
