import { z } from "zod"

import { slugify } from "../utils"

export const createOrganizationSchema = z
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

export const updateOrganizationSchema = z.object({
  name: z.string().min(3).max(50),
})

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>
export type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>
