import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import { getOrganizationsByUserId } from "@/lib/queries/organization"
import { Separator } from "@/components/ui/separator"
import { OrganizationSwitcher } from "@/components/organization-switcher"

import { AppNavItemsSheet } from "./_components/app-sheet-nav-items"
import { AppSidebar } from "./_components/app-sidebar"
import { AppSidebarQuickAction } from "./_components/app-sidebar-quick-action"
import { AppSidebarSheet } from "./_components/app-sidebar-sheet"

interface AppLayoutProps {
  params: {
    orgSlug: string
  }
  children: React.ReactNode
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const orgSlug = decodeURIComponent(params.orgSlug)
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)

  const organizationsPromise = getOrganizationsByUserId({ userId: user.id })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppSidebar orgSlug={orgSlug}>
        <OrganizationSwitcher
          organizationsPromise={organizationsPromise}
          userId={user.id}
        />

        <AppSidebarQuickAction />

        <Separator className="my-2" />
      </AppSidebar>
      <AppSidebarSheet>
        <OrganizationSwitcher
          isSheet
          organizationsPromise={organizationsPromise}
          userId={user.id}
        />
        <AppSidebarQuickAction isSheet />
        <AppNavItemsSheet orgSlug={orgSlug} />
      </AppSidebarSheet>
      <div className="flex flex-col sm:pl-20">
        <div className="min-h-screen flex-1">{children}</div>
      </div>
    </div>
  )
}
