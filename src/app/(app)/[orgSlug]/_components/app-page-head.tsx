import { redirect } from "next/navigation"
import { PenSquare, Search } from "lucide-react"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import { getOrganizationsByUserId } from "@/lib/queries/organization"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher } from "@/components/organization-switcher"
import { AppNavItemsSheet } from "@/app/(app)/[orgSlug]/_components/app-sheet-nav-items"
import { AppSidebarSheet } from "@/app/(app)/[orgSlug]/_components/app-sidebar-sheet"

interface AppPageHeadProps {
  title: string
  icon: React.ReactElement
  children?: React.ReactNode
  orgSlug: string
}

export async function AppPageHead({
  title,
  icon,
  children,
  orgSlug,
}: AppPageHeadProps) {
  const { user } = await validateRequest()

  if (!user) {
    redirect(Paths.Login)
  }

  const organizationsPromise = getOrganizationsByUserId({ userId: user.id })

  return (
    <header className="z-10 flex w-full items-center border-b">
      <div className="z-10 flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 p-4">
        <div className="flex flex-row items-center gap-2">
          <AppSidebarSheet>
            <OrganizationSwitcher
              isSheet
              organizationsPromise={organizationsPromise}
              userId={user.id}
            />

            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1 justify-start space-x-2 rounded shadow-sm"
              >
                <PenSquare className="size-4" />
                <span>Novo Lead</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded shadow-sm"
              >
                <Search className="size-4" />
              </Button>
            </div>

            <AppNavItemsSheet orgSlug={orgSlug} />
          </AppSidebarSheet>
          <div className="flex flex-row items-center gap-2">
            {icon}
            <span className="text-sm">{title}</span>
          </div>
        </div>

        {children}
      </div>
    </header>
  )
}
