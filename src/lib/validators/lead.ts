import { z } from "zod"

export const createLeadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

export type CreateLeadSchema = z.infer<typeof createLeadSchema>
