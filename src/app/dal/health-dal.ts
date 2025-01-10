import "server-only"

import {Health, HealthDTO} from "@/types/domain/health-types"
import {getHealthsWithPaginationByWeek} from "@/services/health-service"
import {cache} from "react"
import {getUserId} from "@/services/user-service"
import {notFound} from "next/navigation"
import {
  canSeeHealthField,
  filterHealthsAttributes,
} from "@/services/authorization/service-authorizations/health-authorization"
import {getConnectedUser} from "./user-dal"

// DAL : React CACHE, Check  Session Auth, UID Redirect, DTO
export const getHealthsByWeekDal = cache(
  async (week: number, year: string, uid: string, page: number) => {
    console.log("getHealthsByWeekDal", week, year, uid, page)
    const userId = await getUserId()
    if (!userId) notFound()
    try {
      //Pattern 1 : Filter by Access Control RBAC atrtributes configuration in the service
      const healths = await getHealthsWithPaginationByWeek(
        week,
        year,
        uid,
        page
      )
      //console.log("healths", healths.data)

      //Pattern 2 : DTO filtered by Access Control RBAC atrtributes configuration
      const dtoByAc = await healthsDTOAccessControl(healths.data)
      //console.log("dtoByAc", dtoByAc)

      //Pattern 3 : DTO manual (with canSeeCategory base on rbac attributes)
      const dto = await healthsDTO(healths.data)
      //console.log("dto", dto)

      return {
        data: await healthsDTO(healths.data),
        pagination: healths.pagination,
      }
    } catch (error) {
      console.error("Failed to fetch finance", error)
      return {data: [] as HealthDTO[], pagination: {pageSize: 0, rowCount: 0}}
    }
  }
)

//DTO permet de controler les champs qui sont envoyées au client
//et de masquer les champs sensibles (bases on accesscontrol attributes)
export async function healthDTO(
  health: Health
): Promise<HealthDTO | undefined> {
  if (!health) return undefined
  // LE DTO Supprime des champs
  // LE DTO peut rendre des champs masqué
  // On peut assi appeler le filter de access-control

  return {
    id: health?.id,
    date: health?.date,
    category: (await canSeeCategory()) ? health?.category : undefined,
    value: health?.value,
    userId: health?.userId,
  }
}

export async function healthsDTO(
  healths: Health[]
): Promise<HealthDTO[] | never[]> {
  if (!healths || healths.length === 0) return []

  const healthDTOs = await Promise.all(
    healths.map(async (product) => await healthDTO(product))
  )

  // Filtre les résultats valides et retourne les HealthDTO
  return healthDTOs.filter(Boolean) as HealthDTO[]
}

export async function healthsDTOAccessControl(
  healths: Health[]
): Promise<HealthDTO[] | never[]> {
  return await filterHealthsAttributes(healths)
}

async function canSeeCategory() {
  const user = await getConnectedUser()
  return canSeeHealthField(user, "category")
}
