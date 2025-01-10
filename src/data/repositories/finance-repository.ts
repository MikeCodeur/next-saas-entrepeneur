import type {
  CreateFinance,
  DeleteFinance,
  UpdateFinance,
} from "@/types/domain/finance-types"
import {and, desc, eq, sql} from "drizzle-orm"

import db from "@/data/db/client"
import {finance} from "@/data/models/finance-model"

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

export const updateFinanceByUidDao = async (
  financeParams: UpdateFinance,
  uid: string
) => {
  const row = await db
    .update(finance)
    .set(financeParams)
    .where(and(eq(finance.id, financeParams.id), eq(finance.userId, uid)))
    .returning()
  return row[0]
}

// necessaire d'avoir un uid?
export const deleteFinanceByUidDao = async (
  financeParams: DeleteFinance,
  uid: string
) => {
  await db
    .delete(finance)
    .where(and(eq(finance.id, financeParams.id), eq(finance.userId, uid)))
}

// GET
export const getFinanceByIdDao = async (id: string) => {
  const rows = await db.query.finance.findFirst({
    where(finance, {eq}) {
      return eq(finance.id, id)
    },
  })

  return rows
}
export const getYearsFinancesByUidDao = async (uid: string) => {
  const rows = await db
    .selectDistinct({
      year: sql<string>`EXTRACT(YEAR FROM ${finance.date})`.as("year"),
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
  const [rows, [{count}]] = await Promise.all([
    db
      .select()
      .from(finance)
      .where(
        sql`${finance.userId} = ${uid} AND EXTRACT(YEAR FROM ${finance.date}) = ${year}`
      )
      .limit(pagination.limit)
      .orderBy(desc(finance.date))
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
      month: sql<string>`EXTRACT(MONTH FROM ${finance.date})`.as("month"),
      dépenses:
        sql<number>`SUM(CASE WHEN ${finance.category} = 'dépenses' THEN ${finance.amount} END)`.as(
          "dépenses"
        ),
      revenus:
        sql<number>`SUM(CASE WHEN ${finance.category} = 'revenus' THEN ${finance.amount} END)`.as(
          "revenus"
        ),
      actifs:
        sql<number>`SUM(CASE WHEN ${finance.category} = 'actifs' THEN ${finance.amount} END)`.as(
          "actifs"
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
