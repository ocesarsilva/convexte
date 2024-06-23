import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "./_components/app-sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)

  if (!user.companyId) redirect("/onboarding")

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col">
        <AppSidebar />
        <div className="flex flex-col sm:pl-20">
          <div className="min-h-screen flex-1">{children}</div>
        </div>
      </div>
    </TooltipProvider>
  )
}
