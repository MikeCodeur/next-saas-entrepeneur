import React from "react"
import SideBarPublic from "@root/public/_components/public-sidebar"
import PublicBreadcrumb from "../_components/public-breadcrumb"
import {getUserByIdDal} from "@/app/dal/user-dal"

const LayoutPublicUserId = async (props: {
  children: React.ReactNode
  params: Promise<{id: string}>
}) => {
  const params = await props.params

  const {children} = props

  const userId = params.id
  console.log("userId", userId)
  const user = await getUserByIdDal(userId)

  return (
    <>
      <PublicBreadcrumb user={user} />
      <div className="flex min-h-screen w-full flex-col md:flex-row xl:justify-center">
        <div className="flex w-full flex-col md:flex-row">
          <div className="p-4 md:w-64">
            <SideBarPublic />
          </div>
          <div className="w-full max-w-7xl p-4 pt-8">{children}</div>
        </div>
      </div>
    </>
  )
}

export default LayoutPublicUserId
