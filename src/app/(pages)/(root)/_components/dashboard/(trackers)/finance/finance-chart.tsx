import FinanceLineChart from "@/app/(pages)/(root)/_components/dashboard/(trackers)/finance/finance-line-chart"
import {formatedFinanceData} from "@/app/components/charts/chart-utils"
import {getFinancesChartByYear} from "@/services/finance-service"

type FinanceChartProps = {
  year?: string
  uid: string
}
const FinanceChart = async ({year, uid}: FinanceChartProps) => {
  console.log("FinanceChartyear", year)
  if (!year) return
  const finances = await getFinancesChartByYear(year, uid)
  const financeFormatted = formatedFinanceData(finances, "month")

  return <FinanceLineChart data={financeFormatted} />
}

export default FinanceChart
