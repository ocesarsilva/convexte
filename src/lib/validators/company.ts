import { z } from "zod"

import { slugify } from "../utils"

export const createCompanySchema = z
  .object({
    name: z.string().min(3).max(50),
    slug: z.string(),
  })
  .refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.name)
    }
    return true
  })

export type CreateCompanySchema = z.infer<typeof createCompanySchema>
