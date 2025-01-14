import {User, UserRoles} from '@/types/domain/user-types'

import type {Session} from 'next-auth'
import {auth} from './auth-service'
import {getUserByIdDao} from '@/data/repositories/user-repository'

export type AuthUser = {
  session?: Session
  user?: User
  role: UserRoles
}

export const getSessionAuth = async () => {
  const session = await auth()
  return session
}

export const isAuthAdmin = async () => {
  const authUser = await getUserAuthExtented()
  return authUser?.role === 'admin'
}

export const getUserAuthExtented = async () => {
  const session = (await auth()) ?? undefined
  const uid = session?.user?.id ?? ''
  if (!uid) return
  const user = await getUserByIdDao(uid)
  if (!user) return
  return {session, user, role: user.role}
}

export const roleHierarchy = ['public', 'user', 'admin']

export function hasRequiredRole(
  userConnected?: User,
  requestedRole?: UserRoles
) {
  if (!userConnected || !requestedRole) {
    return false
  }
  // Définir l'ordre des privilèges
  const useRole = userConnected?.role ?? 'public'
  const userRoleIndex = roleHierarchy.indexOf(useRole as UserRoles)
  const requestedRoleIndex = roleHierarchy.indexOf(requestedRole)
  if (requestedRoleIndex === -1 || userRoleIndex === -1) {
    return false
  }
  if (userRoleIndex >= requestedRoleIndex) {
    return true
  }
  return false
}

export function idAdmin(user?: User) {
  return hasRequiredRole(user as User, 'admin')
}
