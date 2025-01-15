import {getUserIdDal} from '@/app/dal/user-dal'
import {Separator} from '@/components/ui/separator'
import {
  getFinancesWithPaginationByYear,
  getYearsFinancesByUid,
} from '@/services/finance-service.final'
import {DATA_ROWS_PER_PAGE} from '@/utils/constants'
import {notFound} from 'next/navigation'
import React from 'react'

type SearchParams = Promise<{
  // 🐶 Ajoute les paramètres (queryParams) dans le type
  // ⛏️ supprime todo et ajoute 'financeYear', 'page', 'pageSize'
  todo: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  // 🐶 Tu vas devoir récupérer les finances ('getFinancesWithPaginationByYear') en fonction de :
  // - l'année
  // - l'id de l'utilisateur
  // - la pagination (page, limit)
  // ces 3 paramètres sont passés dans les searchParams

  // 🤖
  // await getFinancesWithPaginationByYear(
  //   financeYear,
  //   userId,
  //   page,
  //   limit
  // )

  // 🐶 Récupère les paramètres dans les searchParams :
  // 🐶 - Si 'financeYear' n'est pas pr"sent, utilise une valeur par défaut (année en cours)
  // 🐶 - Si 'page' n'est pas présent, utilise une valeur par défaut (1)
  // 🐶 - Si 'pageSize' n'est pas présent, utilise une valeur par défaut (DATA_ROWS_PER_PAGE)

  // 🐶 Récupère l'id de l'utilisateur connecté ('getUserIdDal')
  // 🐶 Si l'utilisateur n'est pas connecté, renvoie une erreur 404 ('notFound')
  // 🐶 Récupère les années des finances de l'utilisateur ('getYearsFinancesByUid')
  // 🐶 Récupère les finances de l'utilisateur pour l'année, la page et la taille de page ('getFinancesWithPaginationByYear')

  //services
  const years = [] //getYearsFinancesByUid
  const finances = [] //getFinancesWithPaginationByYear
  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Finance</h1>
      <Separator className="my-4" />

      {/* 🐶 Affiche les données */}
      {/* {finances.data.map((finance) => (
        <div key={finance.id}>{finance.label}</div>
      ))}

      {years?.map((finance) => <div key={finance.year}>{finance.year}</div>)} */}
    </div>
  )
}

export default Page
