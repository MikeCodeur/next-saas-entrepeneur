import {Card} from '@/components/ui/card'
import {DataTable} from '@/components/ui/data-table'

import {publicColumns} from './_components/public-columns'
import {getPublicUsersDal} from '@/app/dal/user-dal'
import PublicBreadcrumb from './_components/public-breadcrumb'
//  🐶 Importe `nextCache`
// 🤖 import {unstable_cache as nextCache} from 'next/cache'

type SearchParams = Promise<{
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1
  const pageSize = Number(searchParams?.pageSize) || 10

  // ⛏️ Supprime l'appel à `getPublicUsersDal`
  const users = await getPublicUsersDal(page, pageSize)

  // 🐶 Cache les données avec `nextCache`
  // 🤖
  // const getCachedUsers = nextCache(
  //   async () => getPublicUsersDal(page, pageSize),
  //   [`____key____`], // 🐶 utilise un key unique avec les paramètres
  //   {revalidate: ___duree___}
  // )

  // 🐶 Appelle le cache
  // 🤖
  // const users = await getCachedUsers()
  const hasNoUsers = users?.data.length === 0 || !users

  if (hasNoUsers)
    return (
      <>
        <PublicBreadcrumb />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Utilisateurs publique</h1>
            </div>
            <p>Aucun utilisateur est publique pour le moment</p>
          </div>
        </div>
      </>
    )
  return (
    <>
      <PublicBreadcrumb />
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Utilisateurs publique</h1>
          </div>

          <Card className="flex w-full flex-col space-y-4 py-4 md:items-start md:px-8">
            <DataTable dataTable={users} columns={publicColumns} />
          </Card>
        </div>
      </div>
    </>
  )
}

export default Page
