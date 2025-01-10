// import {createInsertSchema, createSelectSchema} from "drizzle-zod"
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import {relations, sql} from "drizzle-orm"

import type {AdapterAccount} from "next-auth/adapters"

// import {z} from "zod"

export const userRoleEnum = pgEnum("user_role", ["user", "admin", "public"])
export const userVisibilityEnum = pgEnum("user_visibility", [
  "public",
  "private",
])

export const users = pgTable("user", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", {mode: "date"}),
  image: text("image"),
  role: userRoleEnum("role").default("user").notNull(),
  visibility: userVisibilityEnum("visibility").default("private").notNull(),
})

// export const insertUserSchema = createInsertSchema(users)
// export const selectUserSchema = createSelectSchema(users)
// export const createUserSchema = insertUserSchema.pick({
//   email: true,
//   name: true,
// })
// export const updateUserSchema = selectUserSchema.extend({
//   name: z
//     .string()
//     .min(2, {
//       message: "Le nom doit contenir au moins 3 caractères.",
//     })
//     .max(30, {
//       message: "Le nom ne doit pas contenir plus de 30 caractères.",
//     }),
//   email: z.string().email({
//     message: "Le format de l'email n'est pas valide.",
//   }),
// })
// export const userRoleSchema = z.enum(userRoleEnum.enumValues)

// export const getUserRoles = () => {
//   return userRoleEnum.enumValues
// }
// export const USER_ROLE = {
//   USER: getUserRoles()[0],
//   ADMIN: getUserRoles()[1],
// } as const

export type UserModel = typeof users.$inferSelect
// export type CreateEditUserModel = typeof users.$inferInsert
// export type User = z.infer<typeof selectUserSchema>
// export type UserRolesModel = z.infer<typeof userRoleSchema>
// export type UserVisibilityModel = z.infer<typeof userVisibilitySchema>
// export type CreateUser = z.infer<typeof createUserSchema>
// export type UpdateUser = z.infer<typeof updateUserSchema>

//AUTH
// export const userAuthSchema = selectUserSchema
//   .pick({
//     email: true,
//   })
//   .extend({
//     email: z.string().email({
//       message: "L'email n'est pas valide.",
//     }),
//   })

// export const createUserAuthSchema = selectUserSchema
//   .pick({
//     name: true,
//     email: true,
//   })
//   .extend({
//     email: z.string().email({
//       message: "L'email n'est pas valide.",
//     }),
//     name: z
//       .string()
//       .min(2, {
//         message: "Le nom doit contenir au moins 3 caractères.",
//       })
//       .max(30, {
//         message: "Le nom ne doit pas contenir plus de 30 caractères.",
//       }),
//   })

// export type UserAuth = z.infer<typeof userAuthSchema>
// export type CreateUserAuth = z.infer<typeof createUserAuthSchema>

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, {onDelete: "cascade"}),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId").references(() => users.id, {onDelete: "cascade"}),
  expires: timestamp("expires", {mode: "date"}).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", {mode: "date"}).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
  })
)
export const usersRelations = relations(users, ({one}) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
  // finances: many(finance),
}))
