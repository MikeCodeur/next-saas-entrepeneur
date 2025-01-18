import ac, {type Grant, type GrantAction} from './rbac-config'

import type {User} from '@/types/domain/user-types'

type Ressource = Grant['resource']
export const permissionAcces = (
  user: User | undefined,
  ressourceType: Ressource,
  action: GrantAction,
  ressourceUid?: string
) => {
  if (user?.role.includes('admin')) {
    return ac.can('admin')[`${action}Any`](ressourceType) // Admin a toujours accès à `any`
  }

  // Cas où l'utilisateur n'est pas authentifié (undefined)
  if (user === undefined) {
    return ac.can('public')[`${action}Any`](ressourceType) // Utilisateur non authentifié = "public"
  }

  // Cas où l'utilisateur est propriétaire de la ressource
  if (ressourceUid && user.id === ressourceUid) {
    return ac.can(user.role)[`${action}Own`](ressourceType) // Propriétaire de la ressource
  }

  // Cas utilisateur authentifié mais non-propriétaire
  if (ac.can(user.role)[`${action}Any`]) {
    return ac.can(user.role)[`${action}Any`](ressourceType)
  }

  // Cas d'erreur ou de rôle non reconnu
  return ac.can('public')[`${action}Any`](ressourceType) // Fallback sur un rôle public si non reconnu
}
