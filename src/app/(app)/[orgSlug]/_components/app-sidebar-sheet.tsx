"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/contexts/sidebar-provider"

import { appConfig } from "@/config/app"
import { useMediaQuery } from "@/lib/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

interface AppSidebarSheetProps {
  orgSlug: string
  children: React.ReactNode
}
export function AppSidebarSheet({ orgSlug, children }: AppSidebarSheetProps) {
  const { open, setOpen } = useSidebar()

  const isDesktop = useMediaQuery("(min-width: 624px)")
  if (isDesktop) return null

  const pathname = usePathname()

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent side="left" className="flex flex-col gap-6 pt-10 text-sm">
        {children}

        <nav className="flex w-full flex-col items-start gap-2 py-2">
          {appConfig.navItems.map((item) => {
            const Icon = Icons[item.icon]

            const segment = pathname.split("/")[2] ?? undefined
            const active = `/${segment ?? ""}` === item.href

            return (
              <SheetClose key={item.title} asChild>
                <Link
                  href={`/${orgSlug}${item.href}`}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    active ? "bg-muted hover:bg-muted" : "hover:bg-muted/50",
                    "w-full justify-start gap-2"
                  )}
                >
                  <Icon className="size-4" />
                  {item.title}
                </Link>
              </SheetClose>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
