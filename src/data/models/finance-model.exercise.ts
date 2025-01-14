import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import {relations, sql} from 'drizzle-orm'
// 🐶 Importe le modèle user
//import {users} from './user-model'

export const financeCategoryEnum = pgEnum('finance_category', [
  'revenus',
  // 🐶 Ajoute la catégorie 'dépenses' et 'actifs'
])

export const finance = pgTable('finance', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  // 🐶 Ajoute les champs amount, date, category, label et userId

  category: financeCategoryEnum('category').notNull(),
  userId: uuid('userId'),
  // 🐶 Ajoute la foreign key userId
  // .notNull()
  // .references(() => users.id, {onDelete: 'cascade'}),
})

export const financeRelations = relations(finance, ({one}) => ({
  // 🐶 Créé la relation avec l'utilisateur
  // Une finance appartient à un utilisateur
}))

export type FinanceModel = typeof finance.$inferSelect
export type CreateEditFinanceModel = typeof finance.$inferInsert
