import type {CreateFinance, UpdateFinance} from "@/types/domain/finance-types"

import {
  canCreateFinance,
  canDeleteFinance,
  canReadFinance,
  canUpdateFinance,
  filterFinancesAttributes,
} from "@/services/authorization/service-authorizations/finance-authorization"

import {
  createFinanceByUidDao,
  deleteFinanceByUidDao,
  getFinanceByIdDao,
  getFinancesChartByYearDao,
  getFinancesWithPaginationByYearDao,
  getYearsFinancesByUidDao,
  updateFinanceByUidDao,
} from "@/data/repositories/finance-repository"
import {DATA_ROWS_PER_PAGE} from "@/utils/constants"
import {
  createFinanceServiceSchema,
  updateFinanceServiceShema,
} from "./validations/finance-validation"
import {GrantedError} from "./errors/granted-error"
import {ParsedError} from "./errors/parsed-error"

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
//rename getFinancesYearsByUid
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
/**
 *
 * @param id
 */
export const deleteFinanceByid = async ({id}: {id: string}) => {
  const finance = await getFinanceByIdDao(id)

  if (!finance) {
    throw new Error("Id non valide")
  }
  const resourceUid = finance.userId
  const granted = await canDeleteFinance(resourceUid)

  if (!granted) {
    throw new GrantedError()
  }
  await deleteFinanceByUidDao({id}, resourceUid)
}

export const updateFinance = async (financeParams: UpdateFinance) => {
  const resourceUid = financeParams.userId
  const granted = await canUpdateFinance(resourceUid)

  if (!granted) {
    throw new GrantedError()
  }
  const parsed = updateFinanceServiceShema.safeParse(financeParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const financeParamsSanitized = parsed.data
  await updateFinanceByUidDao(financeParamsSanitized, resourceUid)
}

export const getFinancesWithPaginationByYear = async (
  year: string,
  uid: string,
  page: number
) => {
  const granted = await canReadFinance(uid)

  if (!granted) {
    throw new GrantedError()
  }
  // turn page into offset & limit data per page
  const offset = (page - 1) * 10
  const limit = DATA_ROWS_PER_PAGE

  const finances = await getFinancesWithPaginationByYearDao(year, uid, {
    limit,
    offset,
  })
  const filtered = await filterFinancesAttributes(finances.data)

  return {data: filtered, pagination: finances.pagination}
}

export const getFinancesChartByYear = async (year: string, uid: string) => {
  const granted = await canReadFinance(uid)

  if (!granted) {
    throw new GrantedError()
  }
  return await getFinancesChartByYearDao(year, uid)
}
