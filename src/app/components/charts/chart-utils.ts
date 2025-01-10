export type ChartData = {
  [key in string]: number | string
}
type RawData = {
  [key: string]: number | string | Date | boolean
}

export const formatedFinanceData = (datas: RawData[], name: string) => {
  const lineChartDataArray: ChartData[] = []

  for (const data of datas) {
    let lineChartData: ChartData = {}
    const month = new Date(0, Number(data[name]) - 1)
      .toLocaleString("default", {
        month: "short",
      })
      .split(".")[0]
    lineChartData = {
      [name]: month,
      ["dépenses" as keyof ChartData]: Number(data["dépenses"]) || 0,
      ["revenus" as keyof ChartData]: Number(data["revenus"]) || 0,
      ["actifs" as keyof ChartData]: Number(data["actifs"]) || 0,
    } as ChartData
    lineChartDataArray.push(lineChartData)
  }
  return lineChartDataArray
}

export const formatedHealthData = (datas: RawData[], name: string) => {
  const barChartDataArray: ChartData[] = []

  for (const data of datas) {
    let barChartData: ChartData = {}
    const nameChart = new Date(data[name] as string)
      .toLocaleString("default", {
        weekday: "short",
      })
      .split(".")[0]

    barChartData = {
      [name]: nameChart,
      ["calories" as keyof ChartData]: Number(data["calories"]) || 0,
      ["temps" as keyof ChartData]: Number(data["temps"]) || 0,
      ["poids" as keyof ChartData]: Number(data["poids"]) || 0,
    }
    barChartDataArray.push(barChartData)
  }
  return barChartDataArray
}
