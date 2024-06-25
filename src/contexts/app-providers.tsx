import { TooltipProvider } from "@/components/ui/tooltip"

import { SidebarProvider } from "./sidebar-provider"

export function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SidebarProvider>
  )
}
