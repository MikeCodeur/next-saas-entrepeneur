import type {User} from '@/types/domain/user-types'

import {getUserByIdDao} from '@/data/repositories/user-repository'
import {getUserAuthExtented} from '@/services/authentication/auth-utils'
import {permissionAcces} from './authorization-service'

export const canReadUser = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'users',
    'read',
    resourceUid
  )

  const userToRead = await getUserByIdDao(resourceUid)

  const isPublic = userToRead?.visibility === 'public'
  const isGranted = permission?.granted

  if (isPublic || isGranted) return true
  return false
}

export const canUpdateUser = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'users',
    'update',
    resourceUid
  )
  return permission?.granted
}
