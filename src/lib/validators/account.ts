import { z } from "zod"

export const updateAccountSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().optional(),
  avatar: z.string().optional(),
})

export const updateAccountWithoutEmailSchema = updateAccountSchema.omit({
  email: true,
})

export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>
export type UpdateAccountWithoutEmailSchema = z.infer<
  typeof updateAccountWithoutEmailSchema
>
