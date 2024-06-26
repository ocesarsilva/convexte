import { z } from "zod"

import { slugify } from "../utils"

export const createPipelineSchema = z
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

export const updatePipelineSchema = z.object({
  name: z.string().min(3).max(50),
})

export const deletePipelineSchema = z.object({
  pipelineSlug: z.string(),
})

export type CreatePipelineSchema = z.infer<typeof createPipelineSchema>
export type UpdatePipelineSchema = z.infer<typeof updatePipelineSchema>
export type DeletePipelineSchema = z.infer<typeof deletePipelineSchema>
