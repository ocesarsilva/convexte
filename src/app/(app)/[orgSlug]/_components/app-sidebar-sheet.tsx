"use client"

import { useSidebar } from "@/contexts/sidebar-provider"

import { useMediaQuery } from "@/lib/hooks/use-media-query"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface AppSidebarSheetProps {
  children: React.ReactNode
}

export function AppSidebarSheet({ children }: AppSidebarSheetProps) {
  const { open, setOpen } = useSidebar()

  const isDesktop = useMediaQuery("(min-width: 1024px)")
  if (isDesktop) return null

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent side="left" className="flex flex-col gap-6 pt-10 text-sm">
        {children}
      </SheetContent>
    </Sheet>
  )
}
