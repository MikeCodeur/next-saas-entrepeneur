import type {CreateFinance, UpdateFinance} from '@/types/domain/finance-types'

import {GrantedError} from './errors/granted-error'
import {ParsedError} from './errors/parsed-error'
import {
  canCreateFinance,
  canDeleteFinance,
  canReadFinance,
  canUpdateFinance,
} from './authorization/finance-authorization'
import {
  createFinanceServiceSchema,
  updateFinanceServiceShema,
} from './validations/finance-validation'
import {
  createFinanceByUidDao,
  deleteFinanceByidDao,
  getFinanceByIdDao,
  getFinancesByUidDao,
  getFinancesChartByYearDao,
  getFinancesDao,
  getFinancesWithPaginationByYearDao,
  getYearsFinancesByUidDao,
  updateFinanceByidDao,
} from '@/data/repositories/finance-repository'

export const createFinanceByUid = async (
  financeParams: CreateFinance,
  uid: string
) => {
  //Authorization
  const granted = await canCreateFinance(uid)
  console.log(' createFinanceByUidgranted', granted)
  if (!granted) {
    console.log(' createFinanceByUidgranted err', granted)
    throw new GrantedError('Vous ne pouvez pas créer une finance')
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

export const getFinanceById = async (id: string) => {
  const finance = await getFinanceByIdDao(id)

  if (!finance) {
    throw new Error('Id non valide')
  }

  const resourceUid = finance.userId
  const granted = await canReadFinance(resourceUid)

  if (!granted) {
    throw new GrantedError()
  }

  return finance
}
export const updateFinance = async (financeParams: UpdateFinance) => {
  const resourceUid = financeParams.userId
  const granted = await canUpdateFinance(resourceUid)

  if (!granted) {
    throw new GrantedError('Vous ne pouvez pas modifier une finance')
  }
  const parsed = updateFinanceServiceShema.safeParse(financeParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const financeParamsSanitized = parsed.data
  await updateFinanceByidDao(financeParamsSanitized)
}
/**
 *
 * @param id
 */
export const deleteFinanceByid = async (id: string) => {
  const finance = await getFinanceByIdDao(id)

  if (!finance) {
    throw new Error('Id non valide')
  }
  const resourceUid = finance.userId
  const granted = await canDeleteFinance(resourceUid)

  if (!granted) {
    throw new GrantedError('Vous ne pouvez pas supprimer une finance')
  }
  await deleteFinanceByidDao(id)
}

export const getFinancesByUid = async (uid: string) => {
  const finance = await getFinancesByUidDao(uid)

  const granted = await canReadFinance(uid)

  if (!granted) {
    throw new GrantedError()
  }

  return finance
}

export const getYearsFinancesByUid = async (uid: string) => {
  //Authorization
  const granted = await canReadFinance(uid)
  if (!granted) {
    throw new GrantedError()
  }
  // Service Data Validation (not necessary to validate and uid)
  // Sanitize (not necessary to validate and uid)
  return await getYearsFinancesByUidDao(uid)
}

export const getFinancesWithPaginationByYear = async (
  year: string,
  uid: string,
  page: number,
  limit: number
) => {
  const granted = await canReadFinance(uid)

  if (!granted) {
    throw new GrantedError()
  }

  const offset = (page - 1) * limit

  const finances = await getFinancesWithPaginationByYearDao(year, uid, {
    limit,
    offset,
  })

  return {
    data: finances.data,
    pagination: {
      page,
      pageSize: finances.pagination.pageSize,
      rowCount: finances.pagination.rowCount,
    },
  }
}

export const getFinancesChartByYear = async (year: string, uid: string) => {
  const granted = await canReadFinance(uid)

  if (!granted) {
    throw new GrantedError()
  }
  return await getFinancesChartByYearDao(year, uid)
}
