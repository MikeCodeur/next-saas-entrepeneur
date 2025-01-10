import "server-only"

import {cache} from "react"
import {notFound, redirect} from "next/navigation"
import {
  getPublicUsersWithPagination,
  getUser,
  getUserById,
  getUserId,
} from "@/services/user-service"
import {getSessionAuth, isAuthAdmin} from "@/services/authentication/auth-utils"
import {User, UserDTO} from "@/types/domain/user-types"
import {z} from "zod"

export const getConnectedUser = cache(async () => {
  const user = await getUser()
  if (!user) return
  return userDTO(user as User)
})

const userIdSchema = z.object({
  id: z.string(),
})

export const getUserByIdDal = cache(async (userId: string) => {
  const validateFields = userIdSchema.safeParse({id: userId})
  if (!validateFields.success) {
    throw new Error("Invalid User")
  }
  const user = await getUserById(userId)
  if (!user) notFound()
  return user
})

export const getUserIdDal = cache(async () => {
  console.log("getUserIdDal")
  // await redirectToSignInIfUnauthenticatedDal()
  const userId = await getUserId()
  // if (!userId)
  //notFound()
  return userId
})

export const getUserDal = cache(async () => {
  //await redirectToSignInIfUnauthenticatedDal()
  const user = await getUser()
  // if (!user) notFound()
  return user
})

export const getPublicUsersDal = cache(async (page: number) => {
  return await getPublicUsersWithPagination(page)
})

export const redirectToDashboardIfAuthenticatedDal = cache(async () => {
  const session = await getSessionAuth()
  if (session) redirect("/dashboard")
})

export const redirectToSignInIfUnauthenticatedDal = cache(async () => {
  const session = await getSessionAuth()
  if (!session) redirect("/sign-in")
})

// NO USE (example)
export const redirectToRestrictedPageIfNotAdminDal = cache(async () => {
  const session = await isAuthAdmin()
  if (!session) {
    redirect("/restricted")
  }
})

export function userDTO(user: User): UserDTO | undefined {
  if (!user) return undefined
  //Mike : Failed to fetch user TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_1__.experimental_taintUniqueValue) is not a function
  // taintUniqueValue(
  //   "Do not pass visibility to the client.",
  //   user,
  //   user.visibility
  // )
  // autre exemple
  // experimental_taintObjectReference(
  //   'Do not pass ALL environment variables to the client.',
  //   process.env
  // )
  return {
    email: user?.email ?? "",
    name: user?.name ?? "",
    role: user?.role,
  }
}
