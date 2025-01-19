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
    //🐶todo
    expect(1).equal(2) //fail volontaire, 🐶 a toi de faire le test
  })

  // 🐶 Implémentez un test qui vérifie que 'deleteHealthDao' est appelé si l'utilisateur est l'auteur.
  // Utilisez `deleteHealthByid` avec `healthId.id` et vérifiez que `deleteHealthByIdDao` est appelé avec `healthId`.

  // 🐶 Implémentez un test qui lève une erreur si l'utilisateur n'est pas l'auteur.
  // Utilisez `setupUserAuthExtented` pour simuler un utilisateur différent et vérifiez que l'appel à `deleteHealthByid` lève une erreur.

  // 🐶 Implémentez un test qui vérifie que 'deleteHealthDao' est appelé si l'utilisateur est un admin.
  // Simulez un utilisateur admin avec `setupUserAuthExtented` et vérifiez que `deleteHealthByIdDao` est appelé avec `healthId`.
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
  // 🐶 Implémentez un test qui vérifie que `createHealthByUid` est appelé si l'utilisateur est l'auteur.
  // Utilisez `createHealthByUid` avec `healthParams` et `user.id` et vérifiez que `createHealthByUidDao` est appelé une fois.

  // 🐶 Implémentez un test qui lève une erreur si l'utilisateur n'est pas l'auteur.
  // Utilisez `createHealthByUid` avec `healthParams` et `differentUserId` et vérifiez que l'appel lève une erreur.

  // 🐶 Implémentez un test qui vérifie que `createHealthByUid` est appelé si l'utilisateur est un admin.
  // Simulez un utilisateur admin avec `setupUserAuthExtented` et vérifiez que `createHealthByUidDao` est appelé une fois.
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
    //todo
  })
  // 🐶 Implémentez un test qui vérifie que `updateHealthByUidDao` est appelé si l'utilisateur est l'auteur.
  // Utilisez `updateHealth` avec `healthParams` et vérifiez que `updateHealthByIdDao` est appelé une fois.

  // 🐶 Implémentez un test qui lève une erreur si l'utilisateur n'est pas l'auteur.
  // Simulez un utilisateur différent avec `setupUserAuthExtented` et vérifiez que l'appel à `updateHealth` lève une erreur.

  // 🐶 Implémentez un test qui vérifie que `updateHealthByUidDao` est appelé si l'utilisateur est un admin.
  // Simulez un utilisateur admin avec `setupUserAuthExtented` et vérifiez que `updateHealthByIdDao` est appelé une fois.
})
//inutile, mais pour que ça compile l'exprt *
export const forExercise = 1
