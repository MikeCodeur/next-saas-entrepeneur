import type {Finance} from "@/types/domain/finance-types"

import {getUserAuthExtented} from "@/services/authentication/auth-utils"
import {getUserByIdDao} from "@/data/repositories/user-repository"
import {filterRessourceFields, permissionAcces} from "../authorization-service"

export const canReadFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "finance",
    "read",
    resourceUid
  )
  const userToRead = await getUserByIdDao(resourceUid)
  const isPrivate = userToRead?.visibility === "private"
  const isNotGranted = !permission?.granted

  if (isPrivate && isNotGranted) return false
  return true
}

export const canDeleteFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "finance",
    "delete",
    resourceUid
  )
  const isNotGranted = !permission?.granted

  if (!permission || isNotGranted) return false
  return true
}

export const canCreateFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "finance",
    "create",
    resourceUid
  )
  const isNotGranted = !permission?.granted

  if (!permission || isNotGranted) return false
  return true
}

export const canUpdateFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "finance",
    "update",
    resourceUid
  )
  const isNotGranted = !permission?.granted

  if (!permission || isNotGranted) return false
  return true
}
/**
 * filterFinancesAttributes(finances) will check rbac attributes and filter the finance data
 * @param finances
 * @returns
 */
export const filterFinancesAttributes = async (
  finances: Finance[]
): Promise<Finance[]> => {
  const authUser = await getUserAuthExtented()
  const filtered = filterRessourceFields<Finance>(
    authUser?.user,
    "finance",
    "read",
    finances,
    authUser?.user?.id
  )
  return filtered
}
