// 🐶 Adapte 'getHealthsWithPaginationByWeekDao' et 'getWeeksHealthsByYearDao'
import type {
  CreateHealth,
  DeleteHealth,
  UpdateHealth,
} from '@/types/domain/health-types'
import {and, desc, eq, sql} from 'drizzle-orm'

import db from '@/data/db/client'
import {health} from '@/data/models/health-model'

// 🐶 Prend en compte la semaine week (un number entre 1 et 52)
export const getHealthsWithPaginationByWeekDao = async (
  year: string,
  week: number,
  uid: string,
  pagination: {
    limit: number
    offset: number
  }
) => {
  const [rows, [{count}]] = await Promise.all([
    db
      .select()
      .from(health)
      // 🐶 Prend en compte la semaine week (un number entre 1 et 52)
      // 🤖
      // AND EXTRACT(WEEK FROM ... ) = ...
      .where(
        sql`${health.userId} = ${uid}  AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
      )
      .limit(pagination.limit)
      .orderBy(desc(health.date))
      .offset(pagination.offset),
    db
      .select({count: sql<number>`count(*)`})
      .from(health)
      // 🐶 Prend en compte la semaine week (un number entre 1 et 52)
      // 🤖
      // AND EXTRACT(WEEK FROM ... ) = ...
      .where(
        sql`${health.userId} = ${uid}  AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
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

export const getWeeksHealthsByYearDao = async (year: string, uid: string) => {
  const rows = await db
    // 🐶 Utilise la fonction 'date_trunc' pour récupérer la date du premier jour de la semaine
    // 🐶 Utilise la fonction 'date_trunc' pour récupérer la date du dernier jour de la semaine
    // 🐶 Utilise la fonction 'CONCAT' pour concaténer les dates
    .select({
      week: sql<string>`CONCAT( '12-12',' au ', '18-12')`.as('week'),
    })
    // 🐶 Utilise 'selectDistinct' pour eviter les doublons
    .from(health)
    .where(
      sql`${health.userId} = ${uid} AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
    )
  console.log('getWeeksHealthsByYearDao rows', rows)
  return rows
}

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

export const getHealthByIdDao = async (id: string) => {
  const rows = await db.query.health.findFirst({
    where(health, {eq}) {
      return eq(health.id, id)
    },
  })

  return rows
}

export const updateHealthByIdDao = async (healthParams: UpdateHealth) => {
  const row = await db
    .update(health)
    .set(healthParams)
    .where(eq(health.id, healthParams.id))
    .returning()
  return row[0]
}

export const deleteHealthByIdDao = async (healthParams: DeleteHealth) => {
  await db.delete(health).where(eq(health.id, healthParams.id))
}

export const getYearsHealthsByUidDao = async (uid: string) => {
  const rows = await db
    .selectDistinct({
      year: sql<string>`EXTRACT(YEAR FROM ${health.date})`.as('year'),
    })
    .from(health)
    .where(eq(health.userId, uid))
    .orderBy(desc(sql`EXTRACT(YEAR FROM ${health.date})`))

  if (rows.length === 0) {
    return
  }
  return rows
}
