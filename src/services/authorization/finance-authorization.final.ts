import {
  getUserAuthExtented,
  idAdmin,
} from '@/services/authentication/auth-utils'
import {permissionAcces} from './authorization-service'

export const canReadFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'finance',
    'read',
    resourceUid
  )

  return permission.granted
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
