/* eslint-disable unicorn/no-null */
import * as userRepository from '@/data/repositories/user-repository'

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {User} from '@/types/domain/user-types'
import {getUserById, updateUser} from '../user-service'
import {setupUserAuthExtented} from './test-service-helpers'
import {updateUserServiceSchema} from '../validations/user-validation'

// 🐶 Mock les fonctions de 'userRepository' des que necessaire
// vi.mock('@/data/repositories/user-repository', () => ({
//   createUserDao: vi.fn(),
//   ...
// }))

// 🐶 Définir les valeurs des constantes
const currentAuthUserId = '6a4de94e-7f0f-4a1b-89d1-0ba0af89afe9'
const randomUserId = '7a4de94e-7f0f-4a1b-89d1-0ba0af89afe5'

// 🐶 Définir un user de test
const userTest = {
  id: currentAuthUserId,
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: new Date(),
  image: null,
  role: 'user',
  visibility: 'private',
} satisfies User

// 🐶 Mock les fonction lié a authentification
// vi.mock('@/services/authentication/auth-utils', () => ({
//   getUserAuthExtented: vi.fn(() => ({session: {}, userTest, role: 'user'})),
// }))
// vi.mock('@/services/authentication/auth-service', () => ({
//   auth: vi.fn(),
// }))
describe('Teste [getUserById] avec les permissions', () => {
  const userId = currentAuthUserId
  // 🐶 Définir les valeurs que getUserByIdDao doit retourner sur chaque test
  // beforeEach(() => {
  //   vi.clearAllMocks()
  //   vi.mocked(userRepository.getUserByIdDao).mockResolvedValue(userTest)
  // })

  it.skip("[USER] devrait appelé `getUserByIdDao` si l'utilisateur est celui qui est connecté", async () => {
    // 🐶 Utilise setupUserAuthExtented pour simuler l'authentification
    // setupUserAuthExtented({user: userTest})
    // 🐶 Utilise getUserById pour récupérer le user
    // const result = await getUserById(userId)
    // 🐶 Vérifie que le résultat est égal au userTest
    // expect(result).toEqual(userTest)
    // 🐶 Vérifie que getUserByIdDao a été appelé deux fois (car appelé dans canReadUser)
    // expect(userRepository.getUserByIdDao).toHaveBeenCalledTimes(2)
  })
  it.skip("[USER] devrait levé une erreur si l'utilisateur n'est pas celui connecté et privé", async () => {
    // 🐶 Utilise setupUserAuthExtented pour simuler l'authentification
    // d'un user (randomUserId) qui n'est pas celui que l'on veut récupérer (currentAuthUserId)
    // setupUserAuthExtented({
    //   user: {
    //     ...userTest,
    //     id: randomUserId,
    //   },
    // })
    // 🐶 Utilise getUserById pour récupérer le user
    // await expect(
    // await expect(
    //   getUserById(currentAuthUserId)
    // ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
  it.skip("[ADMIN] devrait appelé `getUserByIdDao` si l'utilisateur est un `admin`", async () => {
    // 🐶 Utilise setupUserAuthExtented pour simuler l'authentification un ADMIN
  })
  it.skip("[PUBLIC] devrait appelé `getUserByIdDao` si l'utilisateur est `public`", async () => {
    // 🐶 Utilise setupUserAuthExtented pour simuler l'authentification un user avec visibilité public
    // const userPublic = {
    //   ...userTest,
    //   id: randomUserId,
    //   visibility: 'public',
    // } satisfies User
    // setupUserAuthExtented({user: undefined})
  })
  it.skip("[PUBLIC] devrait levé une erreur si l'utilisateur est `privé`", async () => {
    // 🐶 Utilise setupUserAuthExtented pour simuler l'authentification un user avec visibilité privé
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
  it.skip("[USER] devrait appelé `updateUserByUidDao` si l'utilisateur est celui qui est connecté", async () => {
    // setupUserAuthExtented({user: userTest})
    // await updateUser(updateUserData)
    // expect(userRepository.updateUserByUidDao).toHaveBeenCalled()
    // const parsedData = updateUserServiceSchema.safeParse(updateUserData).data
    // expect(userRepository.updateUserByUidDao).toHaveBeenCalledWith(
    //   parsedData,
    //   userTest.id
    // )
    expect(1).equal(2) //fail volontaire, 🐶 a toi de faire le test
  })
  it.skip("[USER] devrait levé une erreur si l'utilisateur n'est pas celui connecté", async () => {
    // setupUserAuthExtented({
    //   user: {
    //     ...userTest,
    //     id: randomUserId,
    //   },
    // })
    // await expect(
    //   updateUser(userTest)
    // ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
  it.skip("[ADMIN] devrait appelé `updateUserByUidDao` si l'utilisateur est un `admin`", async () => {
    // setupUserAuthExtented({
    //   user: {
    //     ...userTest,
    //     id: randomUserId,
    //     role: 'admin',
    //   },
    // })
    // await updateUser(updateUserData)
    // expect(userRepository.updateUserByUidDao).toHaveBeenCalled()
    // const parsedData = updateUserServiceSchema.safeParse(updateUserData).data
    // expect(userRepository.updateUserByUidDao).toHaveBeenCalledWith(
    //   parsedData,
    //   userTest.id
    // )
  })
  it.skip("[PUBLIC] devrait levé une erreur si l'utilisateur est `public`", async () => {
    // setupUserAuthExtented({user: undefined})
    // await expect(
    //   updateUser(updateUserData)
    // ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
  it.skip("[PUBLIC] devrait levé une erreur si l'utilisateur est `privé`", async () => {
    // setupUserAuthExtented({user: undefined})
    // await expect(
    //   updateUser(updateUserData)
    // ).rejects.toThrowErrorMatchingInlineSnapshot(`[GrantedError: Accès refusé]`)
  })
})
//inutile, mais pour que ça compile l'exprt *
export const forExercise = 1
