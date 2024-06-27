"use server"

import { unstable_noStore as noStore } from "next/cache"
import { db } from "@/server/db"
import { lead } from "@/server/db/schema"
import { generateId } from "lucia"

import { unknownError } from "../constants"
import { getErrorMessage } from "../handle-error"
import { getOrganizationBySlug } from "../queries/organization"
import { type CreateLeadSchema } from "../validators/lead"

export async function createLead(
  input: CreateLeadSchema & {
    orgSlug: string
    pipelineId: string
    formId: string
  }
) {
  noStore()
  try {
    const org = await getOrganizationBySlug(input.orgSlug)

    if (!org) {
      throw unknownError
    }

    const id = generateId(21)
    await db.insert(lead).values({
      id,
      name: input.name,
      email: input.email,
      phone: input.phone,
      organizationId: org.id,
      pipelineId: input.pipelineId,
      formId: input.formId,
    })

    return {
      data: id,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
