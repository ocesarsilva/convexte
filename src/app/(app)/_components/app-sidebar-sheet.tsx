"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/contexts/sidebar-provider"
import { api } from "@/trpc/react"
import { Menu, PenSquare, Search } from "lucide-react"

import { appConfig } from "@/config/app"
import { useMediaQuery } from "@/lib/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

export function AppSidebarSheet() {
  const { open, setOpen } = useSidebar()
  const { data: company } = api.company.get.useQuery()
  const pathname = usePathname()

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
      <SheetContent
        aria-describedby="App sidebar sheet"
        side="left"
        className="flex flex-col gap-6 text-sm"
      >
        {company ? (
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-primary text-base font-semibold text-primary-foreground">
                <span className="flex size-2 items-center justify-center text-center text-sm">
                  {company?.name?.charAt(0).toLocaleUpperCase()}
                </span>
              </div>
              <span>{company.name}</span>
            </Link>
          </SheetClose>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
        )}

        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1 justify-start space-x-2 rounded shadow-sm"
          >
            <PenSquare className="size-4" />
            <span>Novo Lead</span>
          </Button>

          <Button variant="outline" size="icon" className="rounded shadow-sm">
            <Search className="size-4" />
          </Button>
        </div>

        <nav className="flex w-full flex-col items-start gap-2 py-2">
          {appConfig.navItems.map((item) => {
            const Icon = Icons[item.icon]

            return (
              <SheetClose key={item.title} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === item.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-muted/50",
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
