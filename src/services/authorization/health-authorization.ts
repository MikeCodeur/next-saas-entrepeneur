import {
  getUserAuthExtented,
  idAdmin,
} from '@/services/authentication/auth-utils'
import {
  canAccessField,
  filterRessourceFields,
  permissionAcces,
} from './authorization-service'
import {getUserByIdDao} from '@/data/repositories/user-repository'
import {Health} from '@/types/domain/health-types'
import {User, UserDTO} from '@/types/domain/user-types'
import ac from './rbac-config'

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

export const filterHealthsAttributes = async (
  healths: Health[]
): Promise<Health[]> => {
  const authUser = await getUserAuthExtented()
  const filtered = filterRessourceFields<Health>(
    authUser?.user,
    'health',
    'read',
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
  const permission = ac.can(user?.role ?? 'public').readOwn('health')

  // Utilise les permissions pour déterminer si un champs est accessible
  const canSeeField = canAccessField(permission.attributes, field ?? '')
  return canSeeField
}
