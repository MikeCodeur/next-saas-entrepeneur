import {Card} from "@/app/components/ui/card"
import {DataTable} from "@/app/components/ui/data-table"
import {PageProps} from "@/types/app-types"
import {publicColumns} from "./_components/public-columns"
import {getPublicUsersDal} from "@/app/dal/user-dal"
import PublicBreadcrumb from "./_components/public-breadcrumb"

type PublicPropsSearch = Promise<{
  page?: string
}>
export default async function Page(
  props: PageProps<PublicPropsSearch, undefined>
) {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1

  const users = await getPublicUsersDal(page)
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
