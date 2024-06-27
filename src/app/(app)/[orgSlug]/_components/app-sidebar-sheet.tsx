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
  const pathname = usePathname()
  const { open, setOpen } = useSidebar()
  const { navItems } = appConfig

  const isDesktop = useMediaQuery("(min-width: 624px)")
  if (isDesktop) return null

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent
        side="left"
        className="flex flex-col gap-2 px-6 pt-12 text-sm"
      >
        {children}

        <nav className="flex w-full flex-col items-start gap-1">
          {navItems.map((item) => {
            const Icon = Icons[item.icon]
            const url = `/${orgSlug}${item.href}`
            const active = url === pathname

            return (
              <SheetClose key={item.title} asChild>
                <Link
                  key={item.title}
                  href={url}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    {
                      "bg-accent dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white":
                        active,
                    },
                    "w-full justify-start"
                  )}
                >
                  <Icon className="mr-2 size-4" />
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
