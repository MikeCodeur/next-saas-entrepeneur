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

type HealthChartTriggerProps = {
  years: {
    year: string
  }[]
  weeks: {
    week: string
  }[]
  currentYear?: string
  currentWeek?: string
  children?: React.ReactNode
  uid: string
}

const HealthChartTrigger = ({
  years,
  weeks,
  currentYear,
  currentWeek,
  children,
  uid,
}: HealthChartTriggerProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageParamName = "page" as const
  const yearParamName = "healthYear" as const
  const weekParamName = "healthWeek" as const
  const yearParam = searchParams.get(yearParamName)
  const weekParam = searchParams.get(weekParamName)

  // useEffect(() => {
  //   if (!yearParam) {
  //     const url = createQueryParam(yearParamName, years[0].year)
  //     router.push(url.href)
  //   }

  //   if (!weekParam) {
  //     const url = createQueryParam(weekParamName, weeks[0].week)
  //     router.push(url.href)
  //   }
  // }, [yearParam, weekParam, years, weeks, router])

  const handleChangeYear = async (newYear: string) => {
    if (currentYear === newYear) return
    const url = createQueriesParams([
      {
        name: yearParamName,
        value: newYear,
      },
      {
        name: weekParamName,
        value: "",
      },
      {
        name: pageParamName,
        value: 1,
      },
    ])

    router.push(url.href, {scroll: false})
  }
  const handleChangeWeek = (newWeek: string) => {
    if (currentWeek === newWeek) return

    const url = createQueryParam(weekParamName, newWeek)
    router.push(url.href, {scroll: false})
  }

  // if (!yearParam) {
  //   return <ChartBodySkeleton />
  // }
  return (
    <Card>
      <CardHeader className="space-y-4 text-xl font-semibold">
        {!pathname.includes("health") && <CardTitle>Santé</CardTitle>}
        <div className="flex flex-row gap-2">
          <ChartSelectTime
            currentTime={currentYear ?? years[0].year}
            times={years}
            handleChange={handleChangeYear}
            placeholder="Sélectionner une année"
            key="healthYearChartTrigger"
          />
          <ChartSelectTime
            currentTime={currentWeek ?? weeks[0].week}
            times={weeks}
            handleChange={handleChangeWeek}
            placeholder="Sélectionner une semaine"
            key="healthWeekChartTrigger"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )
}

export default HealthChartTrigger
