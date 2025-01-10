import type {
  CreateHealth,
  DeleteHealth,
  UpdateHealth,
} from "@/types/domain/health-types"
import {and, desc, eq, sql} from "drizzle-orm"

import db from "@/data/db/client"
import {health} from "@/data/models/health-model"

// POST
export const createHealthByUidDao = async (
  healthParams: CreateHealth,
  uid: string
) => {
  const row = await db.insert(health).values({
    ...healthParams,
    userId: uid,
  })
  return row
}

export const updateHealthByUidDao = async (
  healthParams: UpdateHealth,
  uid: string
) => {
  const row = await db
    .update(health)
    .set(healthParams)
    .where(and(eq(health.id, healthParams.id), eq(health.userId, uid)))
    .returning()
  return row[0]
}

export const deleteHealthByUidDao = async (
  healthParams: DeleteHealth,
  uid: string
) => {
  await db
    .delete(health)
    .where(and(eq(health.id, healthParams.id), eq(health.userId, uid)))
}

// GET
export const getHealthByIdDao = async (id: string) => {
  const rows = await db.query.health.findFirst({
    where(health, {eq}) {
      return eq(health.id, id)
    },
  })

  return rows
}

export const getYearsHealthsByUidDao = async (uid: string) => {
  const rows = await db
    .selectDistinct({
      year: sql<string>`EXTRACT(YEAR FROM ${health.date})`.as("year"),
    })
    .from(health)
    .where(eq(health.userId, uid))
    .orderBy(desc(sql`EXTRACT(YEAR FROM ${health.date})`))

  if (rows.length === 0) {
    return
  }
  return rows
}

export const getHealthsByYearDao = async (year: number, uid: string) => {
  const rows = await db
    .select()
    .from(health)
    .where(
      sql`${health.userId} = ${uid} AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
    )
  return rows
}

export const getWeeksHealthsByYearDao = async (year: string, uid: string) => {
  console.log("uid", uid)
  console.log("year", year)
  const rows = await db
    .selectDistinct({
      week: sql<string>`CONCAT(TO_CHAR(date_trunc('week', ${health.date}),'DD-MM'),' au ', TO_CHAR((DATE(date_trunc('week', ${health.date}) + INTERVAL '6 day')),'DD-MM'))`.as(
        "week"
      ),
    })
    .from(health)
    .where(
      sql`${health.userId} = ${uid} AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
    )

  return rows
}

export const getHealthsChartbyWeekDao = async (
  year: string,
  week: number,
  uid: string
) => {
  const sq = db
    .select({
      //avoid groupBy with MIN else get each day
      week: sql<Date>`MIN(${health.date})`.as("week"),
      //postgres need this for groupBy
      day: sql<number>`EXTRACT(DAY FROM ${health.date})`.as("day"),
      calories:
        sql<number>`SUM(CASE WHEN ${health.category} = 'calories' THEN ${health.value} ELSE NULL END)`.as(
          "calories"
        ),
      temps:
        sql<number>`SUM(CASE WHEN ${health.category} = 'temps' THEN ${health.value} ELSE NULL END)`.as(
          "time"
        ),
      poids:
        sql<number>`SUM(CASE WHEN ${health.category} = 'poids' THEN ${health.value} ELSE NULL END)`.as(
          "weight"
        ),
    })
    .from(health)
    .where(
      sql`${health.userId} = ${uid} AND EXTRACT(WEEK FROM ${health.date}) = ${week} AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
    )
    .groupBy(sql`EXTRACT(DAY FROM ${health.date})`)
    .as("sq")

  const rows = await db
    .select({
      week: sq.week,
      calories: sq.calories,
      temps: sq.temps,
      poids: sq.poids,
    })
    .from(sq)
    .orderBy(sq.week)

  return rows
}

export const getHealthsWithPaginationByWeekDao = async (
  year: string,
  week: number,
  uid: string,
  pagination: {
    limit: number
    offset: number
  }
) => {
  console.log("getHealthsWithPaginationByWeekDao week", week)
  const [rows, [{count}]] = await Promise.all([
    db
      .select()
      .from(health)
      .where(
        sql`${health.userId} = ${uid} AND EXTRACT(WEEK FROM ${health.date}) = ${week} AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
      )
      .limit(pagination.limit)
      .orderBy(desc(health.date))
      .offset(pagination.offset),
    db
      .select({count: sql<number>`count(*)`})
      .from(health)
      .where(
        sql`${health.userId} = ${uid} AND EXTRACT(WEEK FROM ${health.date}) = ${week} AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
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
