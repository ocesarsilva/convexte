"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { Menu } from "lucide-react"

import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

export function MobileNav() {
  const segment = useSelectedLayoutSegment()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="text-md grid gap-6 font-medium">
          {appConfig.navItems.map((item) => {
            const Icon = Icons[item.icon]
            const active = segment === item.segment

            return (
              <Link
                key={item.title}
                href="#"
                className={cn(
                  "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                  { "text-foreground": active }
                )}
              >
                <Icon className="size-4" />
                {item.title}
              </Link>
            )
          })}

          <Link
            href="#"
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              { "text-foreground": segment === "settings" }
            )}
          >
            <Icons.settings className="size-4" />
            Configurações
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
