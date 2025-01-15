'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import React, {useEffect} from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

import SelectTime from '@/components/selects/select-time'
import {pageParamName, yearParamName} from '@/utils/constants'

type FinanceChartTriggerProps = {
  years: {
    year: string
  }[]
  currentYear?: string
  children?: React.ReactNode
}

const FinanceYearSelect = ({
  years,
  currentYear,
  children,
}: FinanceChartTriggerProps) => {
  // 🐶 Appele useRouter, useSearchParams et usePathname

  const handleChangeYear = (newYear: string) => {
    if (currentYear === newYear) return
    // 🐶 Ajouter l'année dans les paramètres de la requête
    // 🐶 Retour à la première page quand on change l'année
  }

  return (
    <Card>
      <CardHeader className="space-y-4 text-xl font-semibold">
        <CardTitle>Finance</CardTitle>
        <SelectTime
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

export default FinanceYearSelect
