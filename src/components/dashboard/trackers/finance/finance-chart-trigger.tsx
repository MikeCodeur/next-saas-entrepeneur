'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import React, {useEffect} from 'react'
import {createQueriesParams, createQueryParam} from '@/lib/utils'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

import {ChartBodySkeleton} from '../../skeletons/chart-skeleton'
import ChartSelectTime from '@/components/selects/select-time'
import {pageParamName, yearParamName} from '@/utils/constants'

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

  const yearParam = searchParams.get(yearParamName)

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

  return (
    <Card>
      <CardHeader className="space-y-4 text-xl font-semibold">
        {!pathname.includes('finance') && <CardTitle>Finance</CardTitle>}
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
