import HealthBarChart from "./health-bar-chart"
import {formatedHealthData} from "@/app/components/charts/chart-utils"
import {getHealthsChartbyWeek} from "@/services/health-service"
import {getWeekFromLabel} from "@/utils/date-utils"
type HealthChartProps = {
  year?: string
  week?: string
  uid: string
}

const HealthChart = async ({year, week, uid}: HealthChartProps) => {
  //await new Promise((resolve) => setTimeout(resolve, 5000))
  const hasNothingToDisplay = !year || !week
  if (hasNothingToDisplay) return

  const weekFromLabel = getWeekFromLabel(week, year)
  const healths = await getHealthsChartbyWeek(year, weekFromLabel, uid)

  if (!healths) return
  const healthsFormatted = formatedHealthData(healths, "week")

  return <HealthBarChart data={healthsFormatted} />
}

export default HealthChart
