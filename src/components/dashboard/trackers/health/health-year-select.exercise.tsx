'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import React from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {
  healthWeekParamName,
  healthYearParamName,
  pageParamName,
} from '@/utils/constants'
import SelectTime from '@/components/selects/select-time'

type HealthYearWeekSelectProps = {
  years: {
    year: string
  }[]
  weeks: {
    week: string
  }[]
  currentYear?: string
  currentWeek?: string
  children?: React.ReactNode
}

const HealthYearWeekSelect = ({
  years,
  weeks,
  currentYear,
  currentWeek,
  children,
}: HealthYearWeekSelectProps) => {
  //  🐶 Ajoute un second Select pour les 'weeks'
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChangeYear = async (newYear: string) => {
    if (currentYear === newYear) return
    // 🐶 Utilise 'healthYearParamName' ('healthYear')
    // pour le paramètre de l'année, nous devons le distinguer de FinanceYearParamName ('financeYear')

    // 🐶 Utilise 'pageParamName' ('page') pour le paramètre de la page, (celui ci peut etre commun à la logique de pagination)
    // 🐶 Utilise 'pathname' pour la route actuelle
    // 🐶 Utilise 'router' pour rediriger l'utilisateur
  }
  const handleChangeWeek = (newWeek: string) => {
    if (currentWeek === newWeek) return

    // 🐶 Utilise 'healthWeekParamName' ('healthWeek') pour le paramètre de la semaine
    // 🐶 Utilise 'pageParamName' ('page') pour le paramètre de la page, (celui ci peut etre commun à la logique de pagination)
    // 🐶 Utilise 'pathname' pour la route actuelle
    // 🐶 Utilise 'router' pour rediriger l'utilisateur
  }

  return (
    <Card>
      <CardHeader className="space-y-4 text-xl font-semibold">
        {!pathname.includes('health') && <CardTitle>Santé</CardTitle>}
        <div className="flex flex-row gap-2">
          <SelectTime
            currentTime={currentYear ?? years[0].year}
            times={years}
            handleChange={handleChangeYear}
            placeholder="Sélectionner une année"
            key="healthYearChartTrigger"
          />
          {/* 🐶 Ajoute un second Select pour les 'weeks' */}
          {/* <SelectTime
           
          /> */}
        </div>
      </CardHeader>

      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )
}

export default HealthYearWeekSelect
