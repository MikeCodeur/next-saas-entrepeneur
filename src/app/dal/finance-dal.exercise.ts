import 'server-only'
import {cache} from 'react'
import {
  getFinancesWithPaginationByYear,
  getYearsFinancesByUid,
} from '@/services/finance-service'
import {getUserId} from '@/services/user-service'
import {notFound} from 'next/navigation'
import {Finance, FinanceDTO} from '@/types/domain/finance-types'
import {
  canSeeFinanceField,
  filterFinancesAttributes,
} from '@/services/authorization/finance-authorization'
import {getConnectedUser} from './user-dal'

async function canSeeCategory() {
  // 🐶 Appelle `canSeeFinanceField` pour `category`
}

async function canSeeLabel() {
  // 🐶 Appelle `canSeeFinanceField` pour `label`
}

// DAL : React CACHE, Check  Session Auth, UID Redirect, DTO
export const getFinancesByYearDal = cache(
  async (year: string, uid: string, page: number, pageSize: number) => {
    try {
      const finances = await getFinancesWithPaginationByYear(
        year,
        uid,
        page,
        pageSize
      )
      return {
        //  🐶 Utilise `financesDTO` pour filtrer les champs
        data: finances.data, //🤖 await financesDTO(finances.data),
        pagination: finances.pagination,
      }
    } catch (error) {
      console.error('Failed to fetch finance', error)
      return {
        data: [] as FinanceDTO[],
        pagination: {page: 1, pageSize: 0, rowCount: 0},
      }
    }
  }
)

export async function financeDTO(
  finance: Finance
): Promise<FinanceDTO | undefined> {
  if (!finance) return undefined

  return {
    category: finance?.category, // 🐶 Utilise `canSeeCategory` pour `category`
    date: finance?.date,
    amount: finance?.amount,
    label: finance?.label, // 🐶 Utilise `canSeeLabel` pour `category`
    id: finance?.id,
    userId: finance?.userId,
  }
}

export async function financesDTO(products: Finance[]): Promise<FinanceDTO[]> {
  if (!products || products.length === 0) return []

  const financeDTOs = await Promise.all(
    products.map((product) => financeDTO(product))
  )
  return financeDTOs.filter(Boolean) as FinanceDTO[]
}

export const getFinancesYearsDal = cache(async () => {
  const userId = await getUserId()
  if (!userId) notFound()
  try {
    const finances = await getYearsFinancesByUid(userId)
    return finances
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})
