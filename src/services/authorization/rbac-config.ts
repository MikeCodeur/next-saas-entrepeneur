import type {UserRoles} from '@/types/domain/user-types'
import {TrackerType} from '@/utils/constants'
import {AccessControl} from 'accesscontrol'

export type GrantAction = 'create' | 'read' | 'update' | 'delete'
export type Grant = {
  role: UserRoles
  resource: TrackerType | 'users'
  action: `${GrantAction}:${'own' | 'any'}`
  attributes: string
}

const grantAdminList = [
  //finance
  {
    role: 'admin',
    resource: 'finance',
    action: 'create:any',
    attributes: '*',
  },
  {role: 'admin', resource: 'finance', action: 'read:any', attributes: '*'},
  {
    role: 'admin',
    resource: 'finance',
    action: 'update:any',
    attributes: '*',
  },
  {role: 'admin', resource: 'finance', action: 'delete:any', attributes: '*'},
  //health
  {role: 'admin', resource: 'health', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'health', action: 'create:any', attributes: '*'},
  {role: 'admin', resource: 'health', action: 'update:any', attributes: '*'},
  {role: 'admin', resource: 'health', action: 'delete:any', attributes: '*'},
  //users
  {role: 'admin', resource: 'users', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'users', action: 'update:any', attributes: '*'},
] satisfies Grant[]

const grantUserList = [
  //finance
  {role: 'user', resource: 'finance', action: 'read:any', attributes: '*'},
  {
    role: 'user',
    resource: 'finance',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'user',
    resource: 'finance',
    action: 'update:own',
    attributes: '*',
  },
  {role: 'user', resource: 'finance', action: 'delete:own', attributes: '*'},
  //health
  {role: 'user', resource: 'health', action: 'read:any', attributes: '*'},
  {
    role: 'user',
    resource: 'health',
    action: 'create:own',
    attributes: '*',
  },
  {
    role: 'user',
    resource: 'health',
    action: 'update:own',
    attributes: '*',
  },
  {
    role: 'user',
    resource: 'health',
    action: 'delete:own',
    attributes: '*,!role',
  },
  {
    role: 'user',
    resource: 'health',
    action: 'read:own',
    attributes: '*,!category',
  },
  // user
  {role: 'user', resource: 'users', action: 'read:own', attributes: '*,!role'},
  {
    role: 'user',
    resource: 'users',
    action: 'read:any',
    attributes: '!role',
  },
  {
    role: 'user',
    resource: 'users',
    action: 'update:own',
    attributes: '*,!role',
  },
] satisfies Grant[]

const grantPublicList = [
  {
    role: 'public',
    resource: 'users',
    action: 'read:any',
    attributes: ['id', 'name'],
  },
]
const ac = new AccessControl([
  ...grantAdminList,
  ...grantUserList,
  ...grantPublicList,
])

export default ac
