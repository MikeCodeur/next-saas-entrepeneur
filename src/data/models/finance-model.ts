import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import {relations, sql} from "drizzle-orm"

import {users} from "./user-model"

export const financeCategoryEnum = pgEnum("finance_category", [
  "revenus",
  "dépenses",
  "actifs",
])
//@todo: should be called 'finances' instead of 'finance'
export const finance = pgTable("finance", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  amount: integer("amount").notNull(),
  date: timestamp("date", {withTimezone: true}).notNull(),
  category: financeCategoryEnum("category").notNull(),
  label: text("label").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
})

export const financeRelations = relations(finance, ({one}) => ({
  user: one(users, {
    fields: [finance.userId],
    references: [users.id],
  }),
}))

// const selectFinanceSchema = finance.$inferSelect
// const insertFinanceSchema = finance.$inferInsert
export type FinanceModel = typeof finance.$inferSelect
export type CreateEditFinanceModel = typeof finance.$inferInsert
// const selectFinanceSchema = createSelectSchema(finance)
// export const createFinanceSchema = selectFinanceSchema
//   .omit({
//     id: true,
//     userId: true,
//   })
//   .extend({
//     amount: z.coerce.number(),
//     date: z.coerce.date(),
//   })
// export const updateFinanceShema = selectFinanceSchema.extend({
//   amount: z.coerce.number(),
//   date: z.coerce.date(),
// })
// export const financeIdSchema = selectFinanceSchema.pick({id: true})
// export const financeCategorySchema = z.enum(financeCategoryEnum.enumValues)

// export const getFinanceCategories = () => {
//   return financeCategoryEnum.enumValues
// }
// export const FINANCE_CATEGORIES = {
//   incomes: getFinanceCategories()[0],
//   outcomes: getFinanceCategories()[1],
//   assets: getFinanceCategories()[2],
// } as const

// export type Finance = z.infer<typeof selectFinanceSchema>
// export type FinanceId = z.infer<typeof financeIdSchema>
// export type CreateFinance = z.infer<typeof createFinanceSchema>
// export type UpdateFinance = z.infer<typeof updateFinanceShema>
// export type DeleteFinance = z.infer<typeof financeIdSchema>
