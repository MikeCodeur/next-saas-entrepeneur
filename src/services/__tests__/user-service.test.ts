/* eslint-disable unicorn/no-null */
import * as userRepository from '@/data/repositories/user-repository'

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {User} from '@/types/domain/user-types'
import {getUserById, updateUser} from '../user-service'
import {setupUserAuthExtented} from './test-service-helpers'
import {updateUserServiceSchema} from '../validations/user-validation'

vi.mock('@/data/repositories/user-repository', () => ({
  createUserDao: vi.fn(),
  updateUserByUidDao: vi.fn(),
  getUserByIdDao: vi.fn(),
  getPublicUsersWithPaginationDao: vi.fn(),
}))

const currentAuthUserId = '6a4de94e-7f0f-4a1b-89d1-0ba0af89afe9'
const randomUserId = '7a4de94e-7f0f-4a1b-89d1-0ba0af89afe5'

const userTest = {
  id: currentAuthUserId,
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: new Date(),
  image: null,
  role: 'user',
  visibility: 'private',
} satisfies User

vi.mock('@/services/authentication/auth-utils', () => ({
  getUserAuthExtented: vi.fn(() => ({session: {}, userTest, role: 'user'})),
}))
vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
}))

describe('Teste [getUserById] avec les permissions', () => {
  const userId = currentAuthUserId
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(userRepository.getUserByIdDao).mockResolvedValue(userTest)
  })
  it("[USER] devrait appelé `getUserByIdDao` si l'utilisateur est celui qui est connecté", async () => {
    setupUserAuthExtented({user: userTest})
    const result = await getUserById(userId)
    expect(result).toEqual(userTest)
    expect(userRepository.getUserByIdDao).toHaveBeenCalledTimes(2)
  })
  it("[USER] devrait levé une erreur si l'utilisateur n'est pas celui connecté et privé", async () => {
    setupUserAuthExtented({
      user: {
        ...userTest,
        id: randomUserId,
      },
    })
    await expect(
      getUserById(currentAuthUserId)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
  it("[ADMIN] devrait appelé `getUserByIdDao` si l'utilisateur est un `admin`", async () => {
    setupUserAuthExtented({
      user: {
        ...userTest,
        role: 'admin',
      },
    })
    const result = await getUserById(randomUserId)
    expect(result).toEqual(userTest)
    expect(userRepository.getUserByIdDao).toHaveBeenCalledTimes(2)
  })
  it("[PUBLIC] devrait appelé `getUserByIdDao` si l'utilisateur est `public`", async () => {
    const userPublic = {
      ...userTest,
      id: randomUserId,
      visibility: 'public',
    } satisfies User
    setupUserAuthExtented({user: undefined})
    vi.mocked(userRepository.getUserByIdDao).mockResolvedValue(userPublic)

    const result = await getUserById(randomUserId)
    expect(result).toEqual(userPublic)
    expect(userRepository.getUserByIdDao).toHaveBeenCalledTimes(2)
  })
  it("[PUBLIC] devrait levé une erreur si l'utilisateur est `privé`", async () => {
    const userPrivate = userTest

    setupUserAuthExtented({user: undefined})
    vi.mocked(userRepository.getUserByIdDao).mockResolvedValue(userPrivate)

    await expect(
      getUserById(randomUserId)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
})

describe('Teste [updateUserById] avec les permissions', () => {
  const updateUserData = {
    ...userTest,
    name: 'Test User Updated',
  } satisfies User
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it("[USER] devrait appelé `updateUserByUidDao` si l'utilisateur est celui qui est connecté", async () => {
    setupUserAuthExtented({user: userTest})
    await updateUser(updateUserData)
    expect(userRepository.updateUserByUidDao).toHaveBeenCalled()
    const parsedData = updateUserServiceSchema.safeParse(updateUserData).data
    expect(userRepository.updateUserByUidDao).toHaveBeenCalledWith(
      parsedData,
      userTest.id
    )
  })
  it("[USER] devrait levé une erreur si l'utilisateur n'est pas celui connecté", async () => {
    setupUserAuthExtented({
      user: {
        ...userTest,
        id: randomUserId,
      },
    })
    await expect(
      updateUser(userTest)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
  it("[ADMIN] devrait appelé `updateUserByUidDao` si l'utilisateur est un `admin`", async () => {
    setupUserAuthExtented({
      user: {
        ...userTest,
        id: randomUserId,
        role: 'admin',
      },
    })
    await updateUser(updateUserData)
    expect(userRepository.updateUserByUidDao).toHaveBeenCalled()
    const parsedData = updateUserServiceSchema.safeParse(updateUserData).data
    expect(userRepository.updateUserByUidDao).toHaveBeenCalledWith(
      parsedData,
      userTest.id
    )
  })
  it("[PUBLIC] devrait levé une erreur si l'utilisateur est `public`", async () => {
    setupUserAuthExtented({user: undefined})
    await expect(
      updateUser(updateUserData)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
  it("[PUBLIC] devrait levé une erreur si l'utilisateur est `privé`", async () => {
    setupUserAuthExtented({user: undefined})
    await expect(
      updateUser(updateUserData)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
})
