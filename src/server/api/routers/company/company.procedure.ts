import { createCompanySchema } from "@/lib/validators/company"

import { createTRPCRouter, protectedProcedure } from "../../trpc"
import * as services from "./company.service"

export const companyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCompanySchema)
    .mutation(({ ctx, input }) => services.createPost(ctx, input)),
})
