import { createTRPCRouter, protectedProcedure } from "../../trpc"
import * as inputs from "./stripe.input"
import * as services from "./stripe.service"

export const stripeRouter = createTRPCRouter({
  getPlans: protectedProcedure.query(({ ctx }) => services.getStripePlans(ctx)),

  getPlan: protectedProcedure.query(({ ctx }) => services.getStripePlan(ctx)),

  managePlan: protectedProcedure
    .input(inputs.manageSubscriptionSchema)
    .mutation(({ ctx, input }) => services.manageSubscription(ctx, input)),
})
