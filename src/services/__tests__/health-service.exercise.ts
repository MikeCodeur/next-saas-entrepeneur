/* eslint-disable unicorn/no-null */
import * as healthRepository from '@/data/repositories/health-repository'

import {
  createHealthByUid,
  deleteHealthByid,
  updateHealth,
} from '@/services/health-service'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {CreateHealth, Health} from '@/types/domain/health-types'
import {setupUserAuthExtented} from './test-service-helpers'
import {User} from '@/types/domain/user-types'

// MOCKS DAO functions calls in health service
vi.mock('@/data/repositories/health-repository', () => ({
  createHealthByUidDao: vi.fn(),
  deleteHealthByIdDao: vi.fn(),
  getHealthByIdDao: vi.fn(),
  updateHealthByIdDao: vi.fn(),
}))

const healthId = {id: '789'}
const currentAuthUserId = '123'
const differentUserId = '456'
const user = {
  id: currentAuthUserId,
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: null,
  image: null,
  role: 'user',
  visibility: 'public',
} satisfies User

// MOCKS AUTHORIZATION used in health service
vi.mock('@/services/authentication/auth-utils', () => ({
  getUserAuthExtented: vi.fn(() => ({
    session: {},
    user,
    roles: ['user'],
  })),
}))
vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
}))

describe('[deleteHealthById] Quand la fonction est appelée', () => {
  const healthUserId = currentAuthUserId
  const healthParams = {
    date: new Date(),
    value: 100,
    category: 'poids' as const,
    id: healthId.id,
    userId: healthUserId,
  } satisfies Health

  beforeEach(() => {
    vi.mocked(healthRepository.getHealthByIdDao).mockResolvedValue(healthParams)
    vi.clearAllMocks()
  })

  it("[USER] devrait appeler 'deleteHealthDao' si l'utilisateur est l'auteur", async () => {
    //🐶Todo
    expect(1).equal(2) //Fail volontaire, 🐶 à toi de faire le test
  })

  // 🐶 Implémente un test qui vérifie que `deleteHealthDao` est appelé si l'utilisateur est l'auteur.
  // Utilise `deleteHealthByid` avec `healthId.id` et vérifie que `deleteHealthByIdDao` est appelé avec `healthId`.

  // 🐶 Implémente un test qui lève une erreur si l'utilisateur n'est pas l'auteur.
  // Utilise `setupUserAuthExtented` pour simuler un utilisateur différent et vérifie que l'appel à `deleteHealthByid` lève une erreur.

  // 🐶 Implémente un test qui vérifie que `deleteHealthDao` est appelé si l'utilisateur est un admin.
  // Simule un utilisateur admin avec `setupUserAuthExtented` et vérifie que `deleteHealthByIdDao` est appelé avec `healthId`.
})

describe('[createHealthByUid] Quand la fonction est appelée', () => {
  const healthParams = {
    date: new Date(),
    value: 100,
    category: 'poids' as const,
  } satisfies CreateHealth

  beforeEach(() => {
    setupUserAuthExtented({user: {...user}})
    vi.clearAllMocks()
  })
  it("[USER] devrait appelé `createHealthByUid` si l'utilisateur est l'auteur", async () => {
    // 🐶
  })
  // 🐶 Implémente un test qui vérifie que `createHealthByUid` est appelé si l'utilisateur est l'auteur.
  // Utilise `createHealthByUid` avec `healthParams` et `user.id` et vérifie que `createHealthByUidDao` est appelé une fois.

  // 🐶 Implémente un test qui lève une erreur si l'utilisateur n'est pas l'auteur.
  // Utilise `createHealthByUid` avec `healthParams` et `differentUserId` et vérifie que l'appel lève une erreur.

  // 🐶 Implémente un test qui vérifie que `createHealthByUid` est appelé si l'utilisateur est un admin.
  // Simule un utilisateur admin avec `setupUserAuthExtented` et vérifie que `createHealthByUidDao` est appelé une fois.
})

describe('[updateHealth] Quand la fonction est appelée', () => {
  beforeEach(() => {
    setupUserAuthExtented({user: {...user}})
    vi.clearAllMocks()
  })
  const healthParams = {
    date: new Date(),
    value: 100,
    category: 'poids' as const,
    id: healthId.id,
    userId: user.id,
  } satisfies Health
  it("[USER] devrait appelé `updateHealthByUidDao` si l'utilisateur est l'auteur", async () => {
    //Todo
  })
  // 🐶 Implémente un test qui vérifie que `updateHealthByUidDao` est appelé si l'utilisateur est l'auteur.
  // Utilise `updateHealth` avec `healthParams` et vérifie que `updateHealthByIdDao` est appelé une fois.

  // 🐶 Implémente un test qui lève une erreur si l'utilisateur n'est pas l'auteur.
  // Simule un utilisateur différent avec `setupUserAuthExtented` et vérifie que l'appel à `updateHealth` lève une erreur.

  // 🐶 Implémente un test qui vérifie que `updateHealthByUidDao` est appelé si l'utilisateur est un admin.
  // Simule un utilisateur admin avec `setupUserAuthExtented` et vérifie que `updateHealthByIdDao` est appelé une fois.
})
//Inutile, mais pour que ça compile l'export *
export const forExercise = 1
