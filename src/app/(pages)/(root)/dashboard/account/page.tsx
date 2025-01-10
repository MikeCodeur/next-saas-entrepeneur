import {Card} from "@/app/components/ui/card"
import {Separator} from "@/app/components/ui/separator"
import {getUserDal} from "@/app/dal/user-dal"
import {AccountForm} from "./account-form"
import {notFound} from "next/navigation"
import withAuth from "@/app/components/auth/withAuth"

const Page = async () => {
  const user = await getUserDal()
  if (!user) notFound()
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Compte</h1>
      <Separator className="my-4" />
      <Card className="flex flex-col gap-4">
        <AccountForm {...user} uid={user.id} />
      </Card>
    </div>
  )
}

export default withAuth(Page)
