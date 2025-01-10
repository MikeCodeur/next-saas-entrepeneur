import {PropsWithChildren} from "react"
import {Separator} from "@/app/components/ui/separator"

const OverviewLayout = ({children}: PropsWithChildren) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4 pb-4">{children}</div>
    </div>
  )
}

export default OverviewLayout
