import {integer, pgEnum, pgTable, timestamp, uuid} from "drizzle-orm/pg-core"

// import {createSelectSchema} from "drizzle-zod"
import {sql} from "drizzle-orm"
import {users} from "./user-model"

// import {z} from "zod"

export const healthCategoryEnum = pgEnum("health_category", [
  "calories",
  "poids",
  "temps",
])
export const health = pgTable("health", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  value: integer("value").notNull(),
  date: timestamp("date", {withTimezone: true}).notNull(),
  category: healthCategoryEnum("category").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
})
// const selectHealthSchema = health.$inferSelect
// const insertHealthSchema = health.$inferInsert
export type HealthModel = typeof health.$inferSelect
export type CreateEditHealthModel = typeof health.$inferInsert
// const selectHealthSchema = createSelectSchema(health)
// export const createHealthSchema = selectHealthSchema
//   .omit({
//     id: true,
//     userId: true,
//   })
//   .extend({
//     value: z.coerce.number(),
//     date: z.coerce.date(),
//   })
// export const updateHealthShema = selectHealthSchema.extend({
//   value: z.coerce.number(),
//   date: z.coerce.date(),
// })
// export const healthIdSchema = selectHealthSchema.pick({id: true})
// export const financeCategorySchema = z.enum(healthCategoryEnum.enumValues)

// export const getHealthCategories = () => {
//   return healthCategoryEnum.enumValues
// }

// export const HEALTH_CATEGORIES = {
//   calories: getHealthCategories()[0],
//   poids: getHealthCategories()[1],
//   temps: getHealthCategories()[2],
// } as const

// export type Health = z.infer<typeof selectHealthSchema>
// export type HealthId = z.infer<typeof healthIdSchema>
// export type HealthCategory = z.infer<typeof financeCategorySchema>
// export type CreateHealth = z.infer<typeof createHealthSchema>
// export type UpdateHealth = z.infer<typeof updateHealthShema>
// export type DeleteHealth = z.infer<typeof healthIdSchema>
