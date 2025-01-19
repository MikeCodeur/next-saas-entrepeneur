import 'server-only'

import {Health, HealthDTO} from '@/types/domain/health-types'
import {getHealthsWithPaginationByWeek} from '@/services/health-service'
import {cache} from 'react'
import {filterHealthsAttributes} from '@/services/authorization/health-authorization'

// DAL : React CACHE, Check  Session Auth, UID Redirect, DTO
export const getHealthsByWeekDal = cache(
  async (
    week: number,
    year: string,
    uid: string,
    page: number,
    limit: number
  ) => {
    try {
      //Pattern 1 : Filter by Access Control RBAC atrtributes configuration in the service
      const healths = await getHealthsWithPaginationByWeek(
        week,
        year,
        uid,
        page,
        limit
      )

      return {
        data: await healthsDTOAccessControl(healths.data),
        pagination: healths.pagination,
      }
    } catch (error) {
      console.error('Failed to fetch heathl', error)
      return {
        data: [] as HealthDTO[],
        pagination: {page: 0, pageSize: 0, rowCount: 0},
      }
    }
  }
)

export async function healthsDTOAccessControl(
  healths: Health[]
): Promise<HealthDTO[]> {
  return filterHealthsAttributes(healths)
}
