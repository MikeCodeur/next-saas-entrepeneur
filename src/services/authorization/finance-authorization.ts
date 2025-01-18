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
import {Finance} from '@/types/domain/finance-types'
import ac from './rbac-config'
import {User, UserDTO} from '@/types/domain/user-types'

export const canReadFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const permission = permissionAcces(
    authUser?.user,
    'finance',
    'read',
    resourceUid
  )
  const userToRead = await getUserByIdDao(resourceUid)

  const isPublic = userToRead?.visibility === 'public'
  const isGranted = permission?.granted

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
    'finance',
    'read',
    finances,
    authUser?.user?.id
  )
  return filtered
}

export function canSeeFinanceField(
  user?: UserDTO | User,
  field?: string
): boolean {
  const permission = ac.can(user?.role ?? 'public').readOwn('finance')

  // Utilise les permissions pour déterminer si un champs est accessible
  const canSeeField = canAccessField(permission.attributes, field ?? '')
  return canSeeField
}
