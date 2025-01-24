import ac, {type Grant, type GrantAction} from './rbac-config'

import type {User} from '@/types/domain/user-types'

type Ressource = Grant['resource']
export const permissionAcces = (
  user: User | undefined,
  ressourceType: Ressource,
  action: GrantAction,
  ressourceUid?: string
) => {
  // 🐶 Implémente tous les cas de figure
  // Cas où l'utilisateur n'est pas authentifié (undefined)
  // Cas où l'utilisateur est propriétaire de la ressource
  // Cas utilisateur authentifié mais non-propriétaire
  // Cas d'erreur ou de rôle non reconnu
  if (action === 'read' && user?.role.includes('admin')) {
    return ac.can('admin').readAny(ressourceType)
  }

  // 🐶 Une manière plus générique de faire ci-dessous
  // Ces 2 lignes sont identiques
  // ac.can('admin').readAny(ressourceType)
  // ac.can('admin')[`${action}Any`](ressourceType)
  //

  // 🐶 Utilise cette manière plus générique de faire ci-dessous
  // if (user?.role.includes('admin')) {
  //   return ac.can('admin')[`${action}Any`](ressourceType) // Admin a toujours accès à `any`
  // }
  // // Cas où l'utilisateur n'est pas authentifié (undefined)
  // if (user === undefined) {
  //   return ac.can('public')[`${action}Any`](ressourceType) // Utilisateur non authentifié = "public"
  // }
  // // Cas où l'utilisateur est propriétaire de la ressource
  // if (ressourceUid && user.id === ressourceUid) {
  //   return ac.can(user.role)[`${action}Own`](ressourceType) // Propriétaire de la ressource
  // }
  // // Cas utilisateur authentifié mais non-propriétaire
  // if (ac.can(user.role)[`${action}Any`]) {
  //   return ac.can(user.role)[`${action}Any`](ressourceType)
  // }
  // // Cas d'erreur ou de rôle non reconnu
  return ac.can('public')[`${action}Any`](ressourceType) // Fallback sur un rôle public si non reconnu
}
