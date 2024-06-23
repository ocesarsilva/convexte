import { companyRouter } from "./routers/company/company.procedure"
import { stripeRouter } from "./routers/stripe/stripe.procedure"
import { userRouter } from "./routers/user/user.procedure"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  user: userRouter,
  stripe: stripeRouter,
  company: companyRouter,
})

export type AppRouter = typeof appRouter
