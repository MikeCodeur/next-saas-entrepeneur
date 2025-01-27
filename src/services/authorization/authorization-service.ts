import ac, {type Grant, type GrantAction} from './rbac-config'

import type {User} from '@/types/domain/user-types'

type Ressource = Grant['resource']
export const permissionAcces = (
  user: User | undefined,
  ressourceType: Ressource,
  action: GrantAction,
  ressourceUid?: string
) => {
  console.log('ressourceType', ressourceType)
  console.log('action', action)
  console.log('user', user)
  console.log('ressourceUid', ressourceUid)

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

export const filterRessourceFields = <T>(
  user: User | undefined,
  ressourceType: Ressource,
  action: GrantAction,
  ressources?: T[], // La ressource est maintenant de type générique T
  ressourceUid?: string
): T[] => {
  const perms = permissionAcces(user, ressourceType, action, ressourceUid)
  //console.log("perms", perms)
  // Pour tous les éléments de `ressources`, on filtre les attributs `perms.filter(ressource)` `rbac`
  const filteredRessource: T[] =
    ressources?.map((ressource) => {
      // eslint-disable-next-line unicorn/no-array-callback-reference
      return perms.filter(ressource) as T // Assure-toi que le type T est respecté
    }) ?? []

  return filteredRessource
}
export function canAccessField(attributes: string[], field: string): boolean {
  // Vérifie s'il y a une exclusion pour le champ spécifié, par exemple `!rating`
  const isFieldExcluded = attributes.some((attr) =>
    new RegExp(`^!${field}$`).test(attr)
  )

  // Vérifie si `*` est présent (accès à tous les champs) et le champ n'est pas exclu
  const hasAllAttributes = attributes.includes('*')

  // Si `*` est présent mais le champ est explicitement exclu, accès refusé
  if (hasAllAttributes && isFieldExcluded) {
    return false
  }

  // Si le champ est explicitement exclu, retour `false`
  if (isFieldExcluded) {
    return false
  }

  // Si `*` est présent et aucune exclusion, retour `true`
  if (hasAllAttributes) {
    return true
  }

  // Si le champ est explicitement mentionné dans les attributs, accès accordé
  return attributes.includes(field)
}
