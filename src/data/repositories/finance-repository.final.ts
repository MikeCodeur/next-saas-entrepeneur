import type {CreateFinance, UpdateFinance} from '@/types/domain/finance-types'
import {eq, sql, desc} from 'drizzle-orm'

import db from '@/data/db/client'
import {finance} from '@/data/models/finance-model'

export const createFinanceByUidDao = async (
  financeParams: CreateFinance,
  uid: string
) => {
  const row = await db.insert(finance).values({
    ...financeParams,
    userId: uid,
  })
  return row
}

export const getFinanceByIdDao = async (id: string) => {
  const rows = await db.query.finance.findFirst({
    where(finance, {eq}) {
      return eq(finance.id, id)
    },
  })
  return rows
}

export const updateFinanceByidDao = async (financeParams: UpdateFinance) => {
  const {id, userId, ...rest} = financeParams
  const row = await db
    .update(finance)
    .set(rest)
    .where(eq(finance.id, financeParams.id))
    .returning()
  return row[0]
}

export const deleteFinanceByidDao = async (id: string) => {
  await db.delete(finance).where(eq(finance.id, id))
}

export const getFinancesByUidDao = async (uid: string) => {
  const rows = await db.query.finance.findMany({
    where(finance, {eq}) {
      return eq(finance.userId, uid)
    },
  })
  return rows
}

export const getFinancesDao = async () => {
  const rows = await db.query.finance.findMany()
  return rows
}

export const getYearsFinancesByUidDao = async (uid: string) => {
  const rows = await db
    .selectDistinct({
      year: sql<string>`EXTRACT(YEAR FROM ${finance.date})`.as('year'),
    })
    .from(finance)
    .where(eq(finance.userId, uid))
    .orderBy(desc(sql`EXTRACT(YEAR FROM ${finance.date})`))

  if (rows.length === 0) {
    return
  }
  return rows
}

export const getFinancesWithPaginationByYearDao = async (
  year: string,
  uid: string,
  pagination: {
    limit: number
    offset: number
  }
) => {
  console.log('pagination', pagination)
  const [rows, [{count}]] = await Promise.all([
    db
      .select()
      .from(finance)
      .where(
        sql`${finance.userId} = ${uid} AND EXTRACT(YEAR FROM ${finance.date}) = ${year}`
      )
      .limit(pagination.limit)
      .orderBy(desc(finance.date), desc(finance.id)) // ID comme "tie-breaker"
      .offset(pagination.offset),
    db
      .select({count: sql<number>`count(*)`})
      .from(finance)
      .where(
        sql`${finance.userId} = ${uid} AND EXTRACT(YEAR FROM ${finance.date}) = ${year}`
      ),
  ])

  return {
    data: rows.length === 0 ? [] : rows,
    pagination: {
      rowCount: count,
      pageSize: pagination.limit,
    },
  }
}

export const getFinancesChartByYearDao = async (year: string, uid: string) => {
  const rows = await db
    .select({
      month: sql<string>`EXTRACT(MONTH FROM ${finance.date})`.as('month'),
      dépenses:
        sql<number>`SUM(CASE WHEN ${finance.category} = 'dépenses' THEN ${finance.amount} END)`.as(
          'dépenses'
        ),
      revenus:
        sql<number>`SUM(CASE WHEN ${finance.category} = 'revenus' THEN ${finance.amount} END)`.as(
          'revenus'
        ),
      actifs:
        sql<number>`SUM(CASE WHEN ${finance.category} = 'actifs' THEN ${finance.amount} END)`.as(
          'actifs'
        ),
    })
    .from(finance)
    .where(
      sql`${finance.userId} = ${uid} AND EXTRACT(YEAR FROM ${finance.date}) = ${year}`
    )
    .groupBy(
      sql`EXTRACT(YEAR FROM ${finance.date})`,
      sql`EXTRACT(MONTH FROM ${finance.date})`
    )
    .orderBy(
      desc(sql`EXTRACT(YEAR FROM ${finance.date})`),
      sql`EXTRACT(MONTH FROM ${finance.date})`
    )

  return rows
}
