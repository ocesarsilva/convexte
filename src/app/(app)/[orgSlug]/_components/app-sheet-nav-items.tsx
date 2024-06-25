"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

export function AppNavItemsSheet({ orgSlug }: { orgSlug: string }) {
  const pathname = usePathname()

  return (
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
  )
}
