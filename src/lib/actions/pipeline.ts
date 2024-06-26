"use server"

import { unstable_noStore as noStore, revalidateTag } from "next/cache"
import { db } from "@/server/db"
import { organization, pipeline } from "@/server/db/schema"
import { generateId } from "lucia"

import { getErrorMessage } from "../handle-error"
import { getOrganizationBySlug } from "../queries/organization"
import { slugify } from "../utils"
import { type CreatePipelineSchema } from "../validators/pipeline"

export async function createPipeline(
  input: CreatePipelineSchema & { orgSlug: string }
) {
  noStore()
  try {
    const pipelineWithSameSlug = await db.query.pipeline.findFirst({
      where: (table, { eq }) => eq(table.slug, slugify(input.name)),
    })

    if (pipelineWithSameSlug) {
      throw new Error("Esse slug já está sendo usado.")
    }

    const org = await getOrganizationBySlug(input.orgSlug)

    if (!org) {
      throw new Error("Organização não encontrada.")
    }

    const id = generateId(21)

    const newPipeline = await db
      .insert(pipeline)
      .values({
        id,
        name: input.name,
        slug: slugify(input.name),
        organizationId: org.id,
      })
      .returning({
        id: organization.id,
        slug: organization.slug,
      })
      .then((res) => res[0])

    revalidateTag(`pipelines-${input.orgSlug}`)

    if (!newPipeline) {
      throw new Error("Ocorreu um erro ao criar sua funil de vendas.")
    }

    return {
      data: newPipeline,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
