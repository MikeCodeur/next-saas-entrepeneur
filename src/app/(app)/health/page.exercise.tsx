//1. 🚀 Filtrer par semaine : Select
import {getUserIdDal} from '@/app/dal/user-dal'
import {
  getHealthsWithPaginationByWeek,
  // 🐶 Ajoute la fonction `getWeeksHealthsByYear`
  getWeeksHealthsByYear,
  getYearsHealthsByUid,
} from '@/services/health-service'
import {notFound} from 'next/navigation'
import {Separator} from '@/components/ui/separator'
import HealthYearSelect from '@/components/dashboard/trackers/health/health-year-select'
import HealthDataTable from '@/components/dashboard/trackers/health/health-data-table'
import {getWeekFromLabel} from '@/utils/date-utils'
import {DATA_ROWS_PER_PAGE} from '@/utils/constants'

type SearchParams = Promise<{
  healthYear?: string
  // 🐶 Ajoute le params `healthWeek` de type string
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const userId = await getUserIdDal()
  if (!userId) notFound()

  const params = await props.searchParams
  const defaultYear = new Date().getFullYear().toString()

  const page = Number(params?.page) || 1
  const limit = Number(params?.pageSize) || DATA_ROWS_PER_PAGE

  const years = (await getYearsHealthsByUid(userId)) ?? [
    {year: new Date().getFullYear().toString()},
  ]

  const requestedYear = params?.healthYear
  const healthYear =
    requestedYear && years.some((y) => y.year === requestedYear)
      ? requestedYear
      : years?.[0]?.year || defaultYear

  // 🐶 Appelle la fonction `getWeeksHealthsByYear`
  // 🤖 const weeks = (await getWeeksHealthsByYear(healthYear, userId)) ?? []

  // 🐶 Récupère la semaine demandée
  // 🤖 const requestedWeek = params?.healthWeek

  // 🐶 Si la semaine demandée existe dans `weeks`, on l'utilise, sinon on prend la première semaine disponible
  // 🤖 const healthWeek =
  //   requestedWeek && weeks.some((w) => w.week === requestedWeek)
  //     ? requestedWeek
  //     : weeks?.[0]?.week

  // 🐶 Vérifie si la semaine demandée existe dans `weeks`
  const hasCurrentWeek = false // 🤖 weeks?.find((week) => week.week === healthWeek)?.week

  // 🐶 Récupère la semaine (number) à partir du label avec la fonction `getWeekFromLabel`
  // 🤖 const weekFromLabel = getWeekFromLabel(healthWeek, healthYear)
  const healthData = await getHealthsWithPaginationByWeek(
    1, // Semaine 1 de l'année pour le moment, utilise `weekFromLabel`
    healthYear,
    userId,
    page,
    limit
  )

  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Health</h1>
      <Separator className="my-4" />

      <HealthYearSelect
        years={years}
        currentYear={healthYear}
        currentWeek={'Todo'}
        weeks={[{week: 'Todo'}]}
      >
        {hasCurrentWeek ? (
          <HealthDataTable healthTable={healthData} />
        ) : (
          <div>No data for this week</div>
        )}
      </HealthYearSelect>
    </div>
  )
}

export default Page
