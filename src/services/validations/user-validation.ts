import {
  CreateUser,
  UpdateUser,
  User,
  UserVisibility,
} from '@/types/domain/user-types'
import {z} from 'zod'

export const baseUserServiceSchema = z.object({
  email: z.string().email({
    message: "L'email n'est pas valide.",
  }),
}) satisfies z.Schema<Pick<User, 'email'>>

export const createUserServiceSchema = baseUserServiceSchema.extend({
  name: z
    .string()
    .min(3, {
      message: 'Le nom doit contenir au moins 3 caractères.',
    })
    .max(30, {
      message: 'Le nom ne doit pas contenir plus de 30 caractères.',
    }),
}) satisfies z.Schema<CreateUser>

export const updateUserServiceSchema = createUserServiceSchema.extend({
  id: z.string(),
  image: z.string().nullable(),
  visibility: z.enum(['public', 'private']) satisfies z.Schema<UserVisibility>,
}) satisfies z.Schema<UpdateUser>

export const userUuidSchema = z.string().uuid({
  message: "L'identifiant n'est pas valide.",
})
