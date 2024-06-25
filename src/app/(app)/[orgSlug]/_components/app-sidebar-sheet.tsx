"use client"

import { useSidebar } from "@/contexts/sidebar-provider"
import { Menu } from "lucide-react"

import { useMediaQuery } from "@/lib/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AppSidebarSheetProps {
  children: React.ReactNode
}

export function AppSidebarSheet({ children }: AppSidebarSheetProps) {
  const { open, setOpen } = useSidebar()

  const isDesktop = useMediaQuery("(min-width: 1024px)")
  if (isDesktop) return null

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="size-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6 text-sm">
        {children}
      </SheetContent>
    </Sheet>
  )
}
