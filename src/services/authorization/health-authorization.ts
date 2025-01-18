import {
  getUserAuthExtented,
  idAdmin,
} from '@/services/authentication/auth-utils'
import {permissionAcces} from './authorization-service'
import {getUserByIdDao} from '@/data/repositories/user-repository'

export const canReadHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'health',
    'read',
    resourceUid
  )
  const userToRead = await getUserByIdDao(resourceUid)

  const isPublic = userToRead?.visibility === 'public'
  const isGranted = permission?.granted
  console.log('userToRead', userToRead)
  console.log('isPublic', isPublic)
  console.log('isGranted', isGranted)

  if (isPublic || isGranted) return true
  return false
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
