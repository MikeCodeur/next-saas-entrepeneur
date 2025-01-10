import {getUserByIdDao} from "@/data/repositories/user-repository"
import {getUserAuthExtented} from "@/services/authentication/auth-utils"
import type {Health} from "@/types/domain/health-types"
import type {User, UserDTO} from "@/types/domain/user-types"
import {
  canAccessField,
  filterRessourceFields,
  permissionAcces,
} from "../authorization-service"
import ac from "../rbac-config"

export const canReadHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "health",
    "read",
    resourceUid
  )
  const userToRead = await getUserByIdDao(resourceUid)

  const isPrivate = userToRead?.visibility === "private"
  const isNotGranted = !permission?.granted

  if (isPrivate && isNotGranted) return false
  return true
}
export const canDeleteHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "health",
    "delete",
    resourceUid
  )
  const isNotGranted = !permission?.granted

  if (!permission || isNotGranted) return false
  return true
}

export const canCreateHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "health",
    "create",
    resourceUid
  )
  const isNotGranted = !permission?.granted

  if (!permission || isNotGranted) return false
  return true
}

export const canUpdateHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    "health",
    "update",
    resourceUid
  )
  const isNotGranted = !permission?.granted

  if (!permission || isNotGranted) return false
  return true
}

export const filterHealthsAttributes = async (
  healths: Health[]
): Promise<Health[]> => {
  const authUser = await getUserAuthExtented()
  const filtered = filterRessourceFields<Health>(
    authUser?.user,
    "health",
    "read",
    healths,
    authUser?.user?.id
  )
  return filtered
}

//permet de savoir si un utilisateur peut voir un champ de la ressource health
export function canSeeHealthField(
  user?: UserDTO | User,
  field?: string
): boolean {
  const permission = ac.can(user?.role ?? "public").readOwn("health")

  // Utilise les permissions pour déterminer si le champ "category" est visible
  const canSeeField = canAccessField(permission.attributes, field ?? "")
  //console.log("canSeeHeathField", permission.attributes)
  //console.log("canSeeField", field, canSeeField)
  return canSeeField
}
