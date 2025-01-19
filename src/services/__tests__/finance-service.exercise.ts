/* eslint-disable unicorn/no-null */
import * as financeRepository from '@/data/repositories/finance-repository'

import {
  createFinanceByUid,
  deleteFinanceByid,
  updateFinance,
} from '@/services/finance-service'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {User} from '@/types/domain/user-types'
import {setupUserAuthExtented} from './test-service-helpers'
import {Finance, UpdateFinance} from '@/types/domain/finance-types'

// 🐶 Mock les fonctions de financeRepository
// vi.mock('@/data/repositories/finance-repository', () => ({
//   createFinanceByUidDao: vi.fn(),
//   deleteFinanceByidDao: vi.fn(),
//   getFinanceByIdDao: vi.fn(),
//   updateFinanceByidDao: vi.fn(),
// }))

const currentAuthUserId = '123'
const differentUserId = '456'
const user = {
  id: currentAuthUserId,
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: new Date(),
  image: null,
  role: 'user',
  visibility: 'public',
} satisfies User

// 🐶 Mock les fonctions de auth-utils
// vi.mock('@/services/authentication/auth-utils', () => ({
//   getUserAuthExtented: vi.fn(() => ({
//     session: {},
//     user,
//     role: 'user',
//   })),
// }))
// vi.mock('@/services/authentication/auth-service', () => ({
//   auth: vi.fn(),
// }))

describe('[deleteFinanceById] Quand la fonction est appelée', () => {
  const financeId = {id: '789'}
  const financeUserId = currentAuthUserId
  const financeParams = {
    date: new Date(),
    amount: 100,
    category: 'dépenses',
    label: 'Achat vélo',
    userId: financeUserId,
    id: financeId.id,
  } satisfies Finance

  beforeEach(() => {
    // vi.mocked(financeRepository.getFinanceByIdDao).mockResolvedValue(
    //   financeParams
    // )
  })

  it("[USER] devrait appeler 'deleteFinanceDao' si l'utilisateur est l'auteur", async () => {
    // 🐶 Test la fonction deleteFinanceByid
    // await deleteFinanceByid(financeId.id)
    // expect(financeRepository.deleteFinanceByidDao).toHaveBeenCalledWith(
    //   financeId.id
    // )
    expect(1).equal(2) //fail volontaire, 🐶 a toi de faire le test
  })
  it.skip("[USER] devrait levé une erreur si l'utilisateur n'est pas l'auteur", async () => {
    // 🐶 Test la fonction deleteFinanceByid avec un user différent
    // setupUserAuthExtented({user: {...user, id: differentUserId}})
  })

  it.skip("[ADMIN] devrait appeler 'deleteFinanceDao' si l'utilisateur est un admin", async () => {
    // 🐶 Test la fonction deleteFinanceByid avec un user admin
    // setupUserAuthExtented({user: {...user, role: 'admin', id: differentUserId}})
  })
})

describe('[createFinanceByUid] Quand la fonction est appelée', () => {
  const financeId = {id: '789'}
  const financeUserId = currentAuthUserId
  const financeParams = {
    date: new Date(),
    amount: 100,
    category: 'revenus' as const,
    label: 'Vente produit',
    userId: financeUserId,
    id: financeId.id,
  }
  // 🐶 setup le user
  // beforeEach(() => {
  //   setupUserAuthExtented({user})
  //   vi.clearAllMocks()
  // })
  it.skip("[USER] devrait appelé `createFinanceByUidDao` si l'utilisateur est l'auteur", async () => {
    // 🐶 Test la fonction createFinanceByUid
  })

  it.skip("[USER] devrait une erreur si l'utilisateur n'est pas l'auteur", async () => {
    // 🐶 Test la fonction createFinanceByUid avec un user différent
  })

  it.skip("[ADMIN] devrait appelé `createFinanceByUid` si l'utilisateur est un admin", async () => {
    // 🐶 Test la fonction createFinanceByUid avec un user admin
  })
})

describe('[updateFinance] Quand la fonction est appelée', () => {
  const financeUserId = currentAuthUserId
  const financeId = '789'
  const financeParams = {
    id: financeId,
    date: new Date(),
    amount: 100,
    category: 'revenus',
    label: 'Vente produit',
    userId: financeUserId,
  } satisfies UpdateFinance

  // 🐶 setup le user
  // beforeEach(() => {
  //   vi.clearAllMocks()
  //   setupUserAuthExtented({user})
  // })

  it.skip("[USER] devrait appelé `updateFinanceByUidDao` si l'utilisateur est l'auteur", async () => {
    // 🐶 Test la fonction updateFinance
  })

  it.skip("[USER] devrait levé une erreur si l'utilisateur n'est pas l'auteur", async () => {
    // 🐶 Test la fonction updateFinance avec un user différent
  })

  it.skip("[ADMIN] devrait appelé `updateFinanceByUidDao` si l'utilisateur est un admin", async () => {
    // 🐶 Test la fonction updateFinance avec un user admin
  })
})
//inutile, mais pour que ça compile l'exprt *
export const forExercise = 1
