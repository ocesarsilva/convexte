import { company, user } from "@/server/db/schema"
import { generateId } from "lucia"

import { type CreateCompanySchema } from "@/lib/validators/company"

import { type ProtectedTRPCContext } from "../../trpc"

export const createPost = async (
  ctx: ProtectedTRPCContext,
  input: CreateCompanySchema
) => {
  const companyId = generateId(15)

  const { name, slug } = input

  const companyWithSameSlug = await ctx.db.query.company.findFirst({
    where: (table, { eq }) => eq(table.slug, slug),
  })

  if (companyWithSameSlug) {
    throw new Error("Esse slug já está sendo usado.")
  }

  await ctx.db.insert(company).values({
    id: companyId,
    name,
    slug,
  })

  await ctx.db.update(user).set({
    companyId,
  })

  return { id: companyId }
}

export async function getCompany(ctx: ProtectedTRPCContext) {
  const companyId = ctx.user.companyId

  if (!companyId) {
    throw new Error("Não foi possível encontrar sua empresa.")
  }

  const company = await ctx.db.query.company.findFirst({
    where: (table, { eq }) => eq(table.id, companyId),
  })

  return company
}