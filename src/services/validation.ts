import {ZodSchema, z} from "zod"

export const validationObject = <T extends ZodSchema>(
  data: unknown,
  schema: T
): z.infer<T> => {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    throw new Error(`Validation failed ${parsed.error.message}`)
  }
  return parsed.data
}
