import { redirect } from "next/navigation"
import { SidebarProvider } from "@/contexts/sidebar-provider"
import { api } from "@/trpc/server"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "./_components/app-sidebar"
import { AppSidebarHead } from "./_components/app-sidebar-head"
import { AppSidebarQuickAction } from "./_components/app-sidebar-quick-action"

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)

  if (!user.companyId) redirect("/onboarding")

  const companyPromise = api.company.get.query()

  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col">
          <AppSidebar>
            <AppSidebarHead companyPromise={companyPromise} />
            <AppSidebarQuickAction />
          </AppSidebar>
          <div className="flex flex-col sm:pl-20">
            <div className="min-h-screen flex-1">{children}</div>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}
