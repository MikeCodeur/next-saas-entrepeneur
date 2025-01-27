import type {CreateFinance, UpdateFinance} from '@/types/domain/finance-types'

import {GrantedError} from './errors/granted-error'
import {ParsedError} from './errors/parsed-error'
import {canCreateFinance} from './authorization/finance-authorization'
import {createFinanceServiceSchema} from './validations/finance-validation'
import {
  createFinanceByUidDao,
  deleteFinanceByidDao,
  getFinanceByIdDao,
  updateFinanceByidDao,
} from '@/data/repositories/finance-repository'

// 🐶 `createFinanceByUid` est déja créé avec
// 🐶 Authorization
// 🐶 Service Data Validation
// 🐶 Data Sanitized (creation)
//
// 🐶 Adapte toutes les fonctions du service
export const createFinanceByUid = async (
  financeParams: CreateFinance,
  uid: string
) => {
  //Authorization
  const granted = await canCreateFinance(uid)
  if (!granted) {
    throw new GrantedError()
  }
  // Service Data Validation
  const parsed = createFinanceServiceSchema.safeParse(financeParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  // Data Sanitized (creation)
  const financeParamsSanitized = parsed.data
  await createFinanceByUidDao(financeParamsSanitized, uid)
}

// 🐶 Adapte toutes les fonctions du service
export const getFinanceById = async (id: string) => {
  const finance = await getFinanceByIdDao(id)
  return finance
}
// 🐶 Adapte toutes les fonctions du service
export const updateFinance = async (financeParams: UpdateFinance) => {
  await updateFinanceByidDao(financeParams)
}

// 🐶 Adapte toutes les fonctions du service
export const deleteFinanceByid = async (id: string) => {
  await deleteFinanceByidDao(id)
}

// 🐶 Adapte toutes les fonctions du service
export const getFinanceByUid = async (uid: string) => {
  const finance = await getFinanceByIdDao(uid)
  return finance
}
