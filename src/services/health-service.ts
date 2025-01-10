import type {CreateHealth, Health} from "@/types/domain/health-types"

import {
  canCreateHealth,
  canDeleteHealth,
  canReadHealth,
  canUpdateHealth,
  filterHealthsAttributes,
} from "@/services/authorization/service-authorizations/health-authorization"

import {
  createHealthByUidDao,
  deleteHealthByUidDao,
  getHealthByIdDao,
  getHealthsChartbyWeekDao,
  getHealthsWithPaginationByWeekDao,
  getWeeksHealthsByYearDao,
  getYearsHealthsByUidDao,
  updateHealthByUidDao,
} from "@/data/repositories/health-repository"
import {DATA_ROWS_PER_PAGE} from "@/utils/constants"
import {
  createHealthServiceSchema,
  updateHealthServiceSchema,
} from "./validations/health-validation"
import {GrantedError} from "./errors/granted-error"
import {ParsedError} from "./errors/parsed-error"

export const createHealthByUid = async (
  healthParams: CreateHealth,
  uid: string
) => {
  const granted = await canCreateHealth(uid)
  if (!granted) {
    throw new GrantedError()
  }
  const parsed = createHealthServiceSchema.safeParse({
    ...healthParams,
    userId: uid,
  })
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const healthParamsSanitized = parsed.data
  await createHealthByUidDao(healthParamsSanitized, uid)
}
/**
 *
 * @param id
 */
export const deleteHealthByid = async ({id}: {id: string}) => {
  const health = await getHealthByIdDao(id)

  if (!health) {
    throw new Error("Id non valide")
  }
  const resourceUid = health.userId
  const granted = await canDeleteHealth(resourceUid)

  if (!granted) {
    throw new GrantedError()
  }
  await deleteHealthByUidDao({id}, resourceUid)
}

export const updateHealth = async (healthParams: Health) => {
  const resourceUid = healthParams.userId
  const granted = await canUpdateHealth(resourceUid)

  if (!granted) {
    throw new GrantedError()
  }
  const parsed = updateHealthServiceSchema.safeParse(healthParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const healthParamsSanitized = parsed.data
  await updateHealthByUidDao(healthParamsSanitized, resourceUid)
}

export const getYearsHealthsByUid = async (uid: string) => {
  const granted = await canReadHealth(uid)

  if (!granted) {
    throw new GrantedError()
  }
  return await getYearsHealthsByUidDao(uid)
}

export const getWeeksHealthsByYear = async (year: string, uid: string) => {
  const granted = await canReadHealth(uid)

  if (!granted) {
    throw new GrantedError()
  }
  return await getWeeksHealthsByYearDao(year, uid)
}

/**
 * Retrieves the health chart data for a specific week and year.
 *
 * @param {string} year - The year of the week.
 * @param {number} week - The week number.
 * @param {string} uid - The user ID.
 * @return A promise that resolves to the health chart data.
 * @throws {Error} If the user is not authorized to perform the action.
 */
export const getHealthsChartbyWeek = async (
  year: string,
  week: number,
  uid: string
) => {
  const granted = await canReadHealth(uid)

  if (!granted) {
    throw new GrantedError()
  }
  return await getHealthsChartbyWeekDao(year, week, uid)
}

/**
 * Retrieves the health data for a specific week and year.
 *
 * @param {number} week - The week number.
 * @param {string} year - The year of the week.
 * @param {string} uid - The user ID.
 * @param {number} page - The page.
 * @return A promise that resolves to the health data for the specified week and year.
 */
export const getHealthsWithPaginationByWeek = async (
  week: number,
  year: string,
  uid: string,
  page: number
) => {
  const granted = await canReadHealth(uid)

  if (!granted) {
    throw new GrantedError()
  }

  // turn page into offset & limit data per page
  const offset = (page - 1) * 10
  const limit = DATA_ROWS_PER_PAGE
  const healthsByWeek = await getHealthsWithPaginationByWeekDao(
    year,
    week,
    uid,
    {
      limit,
      offset,
    }
  )
  // filter healths attributes
  const filtered = await filterHealthsAttributes(healthsByWeek.data)
  return {data: filtered, pagination: healthsByWeek.pagination}
}
