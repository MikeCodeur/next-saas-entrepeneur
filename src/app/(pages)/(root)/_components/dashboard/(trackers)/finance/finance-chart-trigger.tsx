"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import React, {useEffect} from "react"
import {createQueriesParams, createQueryParam} from "@/app/utils"
import {usePathname, useRouter, useSearchParams} from "next/navigation"

import {ChartBodySkeleton} from "../skeletons/chart-skeleton"
import ChartSelectTime from "@/app/components/charts/chart-select-time"

type FinanceChartTriggerProps = {
  years: {
    year: string
  }[]
  currentYear?: string
  children?: React.ReactNode
}

const FinanceChartTrigger = ({
  years,
  currentYear,
  children,
}: FinanceChartTriggerProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageParamName = "page" as const
  const yearParamName = "financeYear" as const
  const yearParam = searchParams.get(yearParamName)

  // useEffect(() => {
  //   if (!yearParam) {
  //     const url = createQueryParam(yearParamName, years?.[0].year)
  //     router.push(url.href)
  //   }
  // }, [router, yearParam, years])
  // eslint-disable-next-line unicorn/consistent-function-scoping
  // const handleChangeYear = (newYear: string) => {
  //   console.log("changeYear")
  // }
  const handleChangeYear = (newYear: string) => {
    if (currentYear === newYear) return

    const url = createQueriesParams([
      {
        name: yearParamName,
        value: newYear,
      },
      {
        name: pageParamName,
        value: 1,
      },
    ])
    router.push(url.href, {scroll: false})
  }

  // if (!yearParam) {
  //   return <ChartBodySkeleton />
  // }

  return (
    <Card>
      <CardHeader className="space-y-4 text-xl font-semibold">
        {!pathname.includes("finance") && <CardTitle>Finance</CardTitle>}
        <ChartSelectTime
          currentTime={currentYear ?? years?.[0].year}
          times={years}
          handleChange={handleChangeYear}
          placeholder="Sélectionnez une année"
        />
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )
}

export default FinanceChartTrigger
