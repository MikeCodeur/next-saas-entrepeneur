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
    await deleteHealthByid(healthId.id)
    expect(healthRepository.deleteHealthByIdDao).toHaveBeenCalledWith(healthId)
  })
  it("[USER] devrait levé une erreur si l'utilisateur n'est pas l'auteur", async () => {
    setupUserAuthExtented({user: {...user, id: differentUserId}})
    await expect(
      deleteHealthByid(healthId.id)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })

  it("[ADMIN] devrait appeler 'deleteHealthDao' si l'utilisateur est un admin", async () => {
    setupUserAuthExtented({user: {...user, role: 'admin', id: differentUserId}})
    await deleteHealthByid(healthId.id)
    expect(healthRepository.deleteHealthByIdDao).toHaveBeenCalledWith(healthId)
  })
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
    await createHealthByUid(healthParams, user.id)
    expect(healthRepository.createHealthByUidDao).toHaveBeenCalledOnce()
  })

  it("[USER] devrait levé une erreur si l'utilisateur n'est pas l'auteur", async () => {
    await expect(
      createHealthByUid(healthParams, differentUserId)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })

  it("[ADMIN] devrait appelé `createHealtByUid` si l'utilisateur est un admin", async () => {
    setupUserAuthExtented({user: {...user, role: 'admin', id: differentUserId}})
    await createHealthByUid(healthParams, currentAuthUserId)
    expect(healthRepository.createHealthByUidDao).toHaveBeenCalledOnce()
  })
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
    await updateHealth(healthParams)
    expect(healthRepository.updateHealthByIdDao).toHaveBeenCalledOnce()
  })

  it("[USER] devrait levé une erreur si l'utilisateur n'est pas l'auteur", async () => {
    setupUserAuthExtented({user: {...user, id: differentUserId}})
    await expect(
      updateHealth(healthParams)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })

  it("[ADMIN] devrait appelé `updateHealthByUidDao` si l'utilisateur est un admin", async () => {
    setupUserAuthExtented({user: {...user, role: 'admin', id: differentUserId}})
    await updateHealth(healthParams)
    expect(healthRepository.updateHealthByIdDao).toHaveBeenCalledOnce()
  })
})
