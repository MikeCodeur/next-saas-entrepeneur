import React from "react"

import {redirect} from "next/navigation"

import {getConnectedUser, getUserDal} from "@/app/dal/user-dal"

import {User, UserRoles} from "@/types/domain/user-types"
import {hasRequiredRole} from "@/services/authentication/auth-utils"

export type WithAuthProps = {
  user: User
}
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>,
  requiredRole?: UserRoles
) => {
  //console.log(`withAuth Component ${WrappedComponent.name} mounted`)
  return async function WithAuth(props: P) {
    const user = await getUserDal()
    const hasRole = hasRequiredRole(user as User, requiredRole ?? "public")
    // console.log("withAuth user", user)
    // console.log("withAuth hasRole", hasRole)
    // console.log("withAuth requiredRole", requiredRole)
    if (!user) {
      redirect("/sign-in")
    }
    if (!hasRole && requiredRole) {
      redirect(`/restricted?role=${requiredRole ?? ""}`)
    }
    if (!hasRole) {
      redirect(`/restricted`)
    }

    return <WrappedComponent {...props} user={user} />
  }
}

export default withAuth

export const withAuthAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => withAuth(WrappedComponent, "admin")
