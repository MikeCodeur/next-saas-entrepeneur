import {
  getUserAuthExtented,
  idAdmin,
} from '@/services/authentication/auth-utils'

export const canReadFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  // if (hasRoleAdmin) return true
  //
  return true
}

export const canDeleteFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  if (hasRoleAdmin) return true
  return false
}

export const canCreateFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  console.log('hasRoleAdmin', hasRoleAdmin)
  if (hasRoleAdmin) return true
  return false
}

export const canUpdateFinance = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  if (hasRoleAdmin) return true
  return false
}
