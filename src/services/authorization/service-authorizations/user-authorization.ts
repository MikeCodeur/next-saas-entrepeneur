import type {User} from "@/types/domain/user-types"

import {getUserByIdDao} from "@/data/repositories/user-repository"
import {getUserAuthExtented} from "@/services/authentication/auth-utils"
import {filterRessourceFields, permissionAcces} from "../authorization-service"

export const canReadUser = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "users",
    "read",
    resourceUid
  )
  const userToRead = await getUserByIdDao(resourceUid)

  const isPrivate = userToRead?.visibility === "private"
  const isNotGranted = !permission?.granted
  const isNotConnected = !authUser?.user

  if (isPrivate && (!permission || isNotGranted || isNotConnected)) return false
  return true
}

export const canUpdateUser = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "users",
    "update",
    resourceUid
  )
  const isNotGranted = !permission?.granted

  if (!permission || isNotGranted) return false
  return true
}

export const filterPublicUsersAttributes = async (
  users: User[]
): Promise<User[]> => {
  const filtered = filterRessourceFields<User>(
    undefined,
    "users",
    "read",
    users
  )
  return filtered
}
