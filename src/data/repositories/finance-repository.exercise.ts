import type {CreateFinance, UpdateFinance} from '@/types/domain/finance-types'
import {eq, sql, desc} from 'drizzle-orm'

import db from '@/data/db/client'
import {finance} from '@/data/models/finance-model'

export const createFinanceByUidDao = async (
  financeParams: CreateFinance,
  uid: string
) => {
  // 🐶 Créé la finance pour l'utilisateur
}

export const getFinanceByIdDao = async (id: string) => {
  // 🐶 Récupère la finance par son id
}

export const updateFinanceByidDao = async (financeParams: UpdateFinance) => {
  // 🐶 update la finance par son id mais sans le userId car il est en foreign key
}

export const deleteFinanceByidDao = async (id: string) => {
  // 🐶 Supprime la finance par son id
}

export const getFinanceByUidDao = async (uid: string) => {
  // 🐶 Récupère les finances par l'id de l'utilisateur
}

export const getYearsFinancesByUidDao = async (uid: string) => {
  // 🐶 Récupère les années des finances par l'id de l'utilisateur
  // utilise
  // .selectDistinct({
  //   year: sql<string>`EXTRACT(YEAR FROM ${finance.date})`.as('year'),
  // })
}

export const getFinancesWithPaginationByYearDao = async (
  year: string,
  uid: string,
  pagination: {
    limit: number
    offset: number
  }
) => {
  // 🐶 Récupère les finances par l'id de l'utilisateur et par année
  // 🐶 Récupère le nombre de finances par l'id de l'utilisateur et par année
  // 🤖 Pour les annnées utlise EXTRACT(YEAR FROM ${finance.date})
  // 🤖 sql`${finance.userId} = ${uid} AND EXTRACT(YEAR FROM ${finance.date}) = ${year}`
  //
  // 🐶 Retourne les finances et le nombre de finances
  const [rows, [{count}]] = await Promise.all([
    db.select().from(finance),
    // 🐶 complete
    // where
    // limit
    // orderby
    // offset
    db.select({count: sql<number>`count(*)`}).from(finance),
    //where
  ])
  return {
    data: rows.length === 0 ? [] : rows,
    pagination: {
      rowCount: count,
      pageSize: pagination.limit,
    },
  }
}
