import {Card, CardContent, CardHeader} from "@/app/components/ui/card"

const NoDataCard = ({title}: {title: string}) => {
  return (
    <Card className="p-4">
      <CardHeader className="py-4 text-xl font-semibold">{title}</CardHeader>
      <CardContent>
        <p>Aucune donnée</p>
      </CardContent>
    </Card>
  )
}

export default NoDataCard
