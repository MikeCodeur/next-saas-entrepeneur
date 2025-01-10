import "server-only"
import {cache} from "react"
import {
  getFinancesWithPaginationByYear,
  getYearsFinancesByUid,
} from "@/services/finance-service"
import {getUserId} from "@/services/user-service"
import {notFound} from "next/navigation"
import {Finance, FinanceDTO} from "@/types/domain/finance-types"

// DAL : React CACHE, Check  Session Auth, UID Redirect, DTO
export const getFinancesByYearDal = cache(
  async (year: string, page: number, uid: string) => {
    const userId = await getUserId()
    if (!userId) notFound()
    try {
      const finances = await getFinancesWithPaginationByYear(year, uid, page)
      return {
        data: financesDTO(finances.data),
        pagination: finances.pagination,
      }
    } catch (error) {
      console.error("Failed to fetch finance", error)
      return {data: [] as FinanceDTO[], pagination: {pageSize: 0, rowCount: 0}}
    }
  }
)

export const getFinancesYearsDal = cache(async () => {
  const userId = await getUserId()
  if (!userId) notFound()
  try {
    const finances = await getYearsFinancesByUid(userId)
    return finances
    // return financesDTO(finances)
  } catch (error) {
    console.error("Failed to fetch user", error)
    return
  }
})

export function financeDTO(finance: Finance): FinanceDTO | undefined {
  if (!finance) return undefined
  // LE DTO Supprime des champs
  // LE DTO peut rendre des champs masqué
  return {
    category: canSeeCategory() ? finance?.category : "revenus",
    date: finance?.date,
    amount: finance?.amount,
    label: finance?.label,
    id: finance?.id,
    userId: finance?.userId,
  }
}

export function financesDTO(products: Finance[]): FinanceDTO[] | never[] {
  if (!products || products.length === 0) return []

  return products
    .map((product) => financeDTO(product))
    .filter(Boolean) as FinanceDTO[]
}
function canSeeCategory() {
  //call rbac for filed check
  return true
}
