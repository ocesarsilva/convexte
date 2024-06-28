import { redirect } from "next/navigation"
import { SidebarProvider } from "@/contexts/sidebar-provider"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import { getOrganizationsByUserId } from "@/lib/queries/organization"
import { TooltipProvider } from "@/components/ui/tooltip"
import { OrganizationSwitcher } from "@/components/organization-switcher"

import { AppSidebar } from "./_components/app-sidebar"
import { AppSidebarQuickAction } from "./_components/app-sidebar-quick-action"
import { AppSidebarSheet } from "./_components/app-sidebar-sheet"

interface AppLayoutProps {
  children: React.ReactNode
  params: {
    orgSlug: string
  }
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const orgSlug = decodeURIComponent(params.orgSlug)
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)

  const organizationsPromise = getOrganizationsByUserId({ userId: user.id })

  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col">
          <AppSidebar orgSlug={orgSlug}>
            <OrganizationSwitcher
              organizationsPromise={organizationsPromise}
              userId={user.id}
            />

            <AppSidebarQuickAction />
          </AppSidebar>
          <AppSidebarSheet orgSlug={orgSlug}>
            <OrganizationSwitcher
              organizationsPromise={organizationsPromise}
              userId={user.id}
              isSheet
            />
            <AppSidebarQuickAction isSheet />
          </AppSidebarSheet>
          <div className="flex flex-col sm:pl-20">
            <div className="min-h-screen flex-1">{children}</div>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}
