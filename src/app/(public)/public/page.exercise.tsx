import {Card} from '@/components/ui/card'
import {DataTable} from '@/components/ui/data-table'

import {publicColumns} from './_components/public-columns'
import {getPublicUsersDal} from '@/app/dal/user-dal'
import PublicBreadcrumb from './_components/public-breadcrumb'

type SearchParams = Promise<{
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1
  const pageSize = Number(searchParams?.pageSize) || 10
  //const users = //await getPublicUsersDal(page, pageSize)
  const hasUsers = false //users && users.data.length > 0

  if (!hasUsers)
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
      {/* <PublicBreadcrumb />
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Utilisateurs publique</h1>
          </div>

          <Card className="flex w-full flex-col space-y-4 py-4 md:items-start md:px-8">
            <DataTable dataTable={users} columns={publicColumns} />
          </Card>
        </div>
      </div> */}
    </>
  )
}

export default Page
