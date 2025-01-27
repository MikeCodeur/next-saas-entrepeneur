import {
  getUserAuthExtented,
  idAdmin,
} from '@/services/authentication/auth-utils'
import {permissionAcces} from './authorization-service'
import {getUserByIdDao} from '@/data/repositories/user-repository'

export const canReadFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'finance',
    'read',
    resourceUid
  )

  // 🐶 Appelle le `DAO` pour récupérer les données de l'utilisateur
  //const userToRead = await getUserByIdDao(resourceUid)

  // 🐶 Vérifie si l'utilisateur est public
  const isPublic = false

  // 🐶 Vérifie si l'utilisateur a les permissions
  const isGranted = false

  // 🐶 Si l'utilisateur est public ou a les permissions, retourne true
  if (isPublic || isGranted) return true
  return false
}

export const canDeleteFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'finance',
    'delete',
    resourceUid
  )
  return permission.granted
}

export const canCreateFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'finance',
    'create',
    resourceUid
  )
  return permission.granted
}

export const canUpdateFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'finance',
    'update',
    resourceUid
  )
  return permission.granted
}
