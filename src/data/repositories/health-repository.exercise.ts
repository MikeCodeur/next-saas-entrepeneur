import type {
  CreateHealth,
  DeleteHealth,
  UpdateHealth,
} from '@/types/domain/health-types'
import {and, desc, eq, sql} from 'drizzle-orm'

import db from '@/data/db/client'
import {health} from '@/data/models/health-model'

export const getHealthsChartbyWeekDao = async (
  year: string,
  week: number,
  uid: string
) => {
  const sq = db
    .select({
      // 🐶 Ajoute un alias pour la colonne week
      //week: sql<Date>`MIN(${health.date})`.as('week'),
      // 🐶 Ajoute un alias pour la colonne week cela est utile pour groupBy
      // day: sql<number>`EXTRACT(DAY FROM ${health.date} AT TIME ZONE 'UTC')`.as(
      //   'day'
      // ),
      // 🐶 Ajoute un alias pour la colonne calories (somme des calories)
      // calories:
      //   sql<number>`SUM(CASE WHEN ${health.category} = 'calories' THEN ${health.value} ELSE NULL END)`.as(
      //     'calories'
      //   ),
      // 🐶 Fait la somme des temps et poids
    })
    .from(health)
    // 🐶 Filtre les données par l'utilisateur, la semaine et l'année
    // .where(
    //   sql`${health.userId} = ${uid} AND EXTRACT(WEEK FROM ${health.date} AT TIME ZONE 'UTC') = ${week} AND EXTRACT(YEAR FROM ${health.date} AT TIME ZONE 'UTC') = ${year}`
    // )
    // 🐶 GroupBy la colonne DAY
    //.groupBy(sql`EXTRACT(DAY FROM ${health.date} AT TIME ZONE 'UTC')`)
    // 🐶 Ajoute un alias pour la table pour pouvoir requeter apres
    .as('sq')

  // 🐶 Requete les données de la table sq
  // const rows = await db
  //   .select({
  //     week: sq.week,
  //    🐶 continue
  //   })
  //   .from(sq)
  //   .orderBy(sq.week)

  //return rows
  return []
}

export const createHealthByUidDao = async (
  healthParams: CreateHealth,
  uid: string
) => {
  const row = await db.insert(health).values({
    ...healthParams,
    date: sql`${healthParams.date}::timestamp AT TIME ZONE 'UTC'`,
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

export const getHealthsWithPaginationByWeekDao = async (
  year: string,
  week: number,
  uid: string,
  pagination: {
    limit: number
    offset: number
  }
) => {
  console.log('getHealthsWithPaginationByWeekDao week', week)
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

export const getWeeksHealthsByYearDao = async (year: string, uid: string) => {
  console.log('uid', uid)
  console.log('year', year)
  const rows = await db
    .selectDistinct({
      week: sql<string>`CONCAT(TO_CHAR(date_trunc('week', ${health.date}),'DD-MM'),' au ', TO_CHAR((DATE(date_trunc('week', ${health.date}) + INTERVAL '6 day')),'DD-MM'))`.as(
        'week'
      ),
      // pour pouvoir trier par date dans un select distinct
      weekStart: sql<Date>`date_trunc('week', ${health.date})`.as('week_start'),
    })
    .from(health)
    .where(
      sql`${health.userId} = ${uid} AND EXTRACT(YEAR FROM ${health.date}) = ${year}`
    )
    .orderBy(desc(sql`week_start`))
  return rows
}
