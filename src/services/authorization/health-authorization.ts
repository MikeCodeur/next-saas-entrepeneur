import {
  getUserAuthExtented,
  idAdmin,
} from '@/services/authentication/auth-utils'
import {permissionAcces} from './authorization-service'

export const canReadHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'health',
    'read',
    resourceUid
  )
  return permission.granted
}
export const canDeleteHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'health',
    'delete',
    resourceUid
  )
  return permission.granted
}

export const canCreateHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'health',
    'create',
    resourceUid
  )
  return permission.granted
}

export const canUpdateHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'health',
    'update',
    resourceUid
  )

  return permission.granted
}
