"use server"

import { unstable_noStore as noStore, revalidateTag } from "next/cache"
import { db } from "@/server/db"
import { organization } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { generateId } from "lucia"

import { getErrorMessage } from "../handle-error"
import { slugify } from "../utils"
import {
  type CreateOrganizationSchema,
  type UpdateOrganizationSchema,
} from "../validators/organization"

export async function createOrganization(
  input: CreateOrganizationSchema & { userId: string }
) {
  noStore()
  try {
    const orgWithSameSlug = await db.query.organization.findFirst({
      where: (table, { eq }) => eq(table.slug, slugify(input.name)),
    })

    if (orgWithSameSlug) {
      throw new Error("Esse slug já está sendo usado.")
    }

    const id = generateId(21)

    const newStore = await db
      .insert(organization)
      .values({
        id,
        name: input.name,
        slug: slugify(input.name),
        ownerId: input.userId,
      })
      .returning({
        id: organization.id,
        slug: organization.slug,
      })
      .then((res) => res[0])

    revalidateTag(`organizations-${input.userId}`)

    return {
      data: newStore,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function updateOrganization(
  input: UpdateOrganizationSchema & { orgSlug: string }
) {
  noStore()
  try {
    const orgWithSameSlug = await db.query.organization.findFirst({
      where: (table, { eq }) => eq(table.slug, slugify(input.name)),
      columns: {
        id: true,
      },
    })

    if (orgWithSameSlug) {
      throw new Error("O slug escolhido já está sendo usado.")
    }

    const [data] = await db
      .update(organization)
      .set({
        name: input.name,
        slug: slugify(input.name),
      })
      .where(eq(organization.slug, input.orgSlug))
      .returning()

    if (!data) {
      throw new Error("Ocorreu um erro ao atualizar sua organização.")
    }

    return {
      data: data,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
