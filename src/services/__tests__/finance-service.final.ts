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

vi.mock('@/data/repositories/finance-repository', () => ({
  createFinanceByUidDao: vi.fn(),
  deleteFinanceByidDao: vi.fn(),
  getFinanceByIdDao: vi.fn(),
  updateFinanceByidDao: vi.fn(),
}))

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

vi.mock('@/services/authentication/auth-utils', () => ({
  getUserAuthExtented: vi.fn(() => ({
    session: {},
    user,
    role: 'user',
  })),
}))
vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
}))

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
    vi.mocked(financeRepository.getFinanceByIdDao).mockResolvedValue(
      financeParams
    )
  })

  it("[USER] devrait appeler 'deleteFinanceDao' si l'utilisateur est l'auteur", async () => {
    await deleteFinanceByid(financeId.id)
    expect(financeRepository.deleteFinanceByidDao).toHaveBeenCalledWith(
      financeId.id
    )
  })
  it("[USER] devrait levé une erreur si l'utilisateur n'est pas l'auteur", async () => {
    setupUserAuthExtented({user: {...user, id: differentUserId}})
    await expect(
      deleteFinanceByid(financeId.id)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[GrantedError: Accès refusé : Vous ne pouvez pas supprimer une finance]`
    )
  })

  it("[ADMIN] devrait appeler 'deleteFinanceDao' si l'utilisateur est un admin", async () => {
    setupUserAuthExtented({user: {...user, role: 'admin', id: differentUserId}})
    await deleteFinanceByid(financeId.id)
    expect(financeRepository.deleteFinanceByidDao).toHaveBeenCalledWith(
      financeId.id
    )
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
  beforeEach(() => {
    setupUserAuthExtented({user})
    vi.clearAllMocks()
  })
  it("[USER] devrait appelé `createFinanceByUidDao` si l'utilisateur est l'auteur", async () => {
    await createFinanceByUid(financeParams, user.id)
    expect(financeRepository.createFinanceByUidDao).toHaveBeenCalledWith(
      financeParams,
      user.id
    )
  })

  it("[USER] devrait une erreur si l'utilisateur n'est pas l'auteur", async () => {
    setupUserAuthExtented({user: {...user, id: differentUserId}})
    await expect(
      createFinanceByUid(financeParams, currentAuthUserId)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[GrantedError: Accès refusé : Vous ne pouvez pas créer une finance]`
    )
  })

  it("[ADMIN] devrait appelé `createFinanceByUid` si l'utilisateur est un admin", async () => {
    setupUserAuthExtented({user: {...user, role: 'admin'}})
    await createFinanceByUid(financeParams, differentUserId)
    expect(financeRepository.createFinanceByUidDao).toHaveBeenCalledOnce()
    expect(financeRepository.createFinanceByUidDao).toHaveBeenCalledWith(
      financeParams,
      differentUserId
    )
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

  beforeEach(() => {
    vi.clearAllMocks()
    setupUserAuthExtented({user})
  })

  it("[USER] devrait appelé `updateFinanceByUidDao` si l'utilisateur est l'auteur", async () => {
    await updateFinance(financeParams)
    expect(financeRepository.updateFinanceByidDao).toHaveBeenCalledOnce()
    expect(financeRepository.updateFinanceByidDao).toHaveBeenCalledWith(
      financeParams
    )
  })

  it("[USER] devrait levé une erreur si l'utilisateur n'est pas l'auteur", async () => {
    setupUserAuthExtented({user: {...user, id: differentUserId}})
    await expect(
      updateFinance(financeParams)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[GrantedError: Accès refusé : Vous ne pouvez pas modifier une finance]`
    )
  })

  it("[ADMIN] devrait appelé `updateFinanceByUidDao` si l'utilisateur est un admin", async () => {
    setupUserAuthExtented({user: {...user, role: 'admin'}})
    await updateFinance(financeParams)
    expect(financeRepository.updateFinanceByidDao).toHaveBeenCalledOnce()
    expect(financeRepository.updateFinanceByidDao).toHaveBeenCalledWith(
      financeParams
    )
  })
})
//inutile, mais pour que ça compile l'exprt *
export const forExercise = 1
