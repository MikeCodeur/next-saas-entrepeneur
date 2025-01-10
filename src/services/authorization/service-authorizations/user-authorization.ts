import type {User} from '@/types/domain/user-types'

import {getUserByIdDao} from '@/data/repositories/user-repository'
import {getUserAuthExtented} from '@/services/authentication/auth-utils'

export const canReadUser = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  return true
}

export const canUpdateUser = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  if (authUser?.user.id === resourceUid || authUser?.role === 'admin')
    return true
  return false
}
