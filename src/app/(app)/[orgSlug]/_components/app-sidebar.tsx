"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
  orgSlug: string
  children: React.ReactNode
}

export function AppSidebar({ children, orgSlug, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const { navItems } = appConfig

  return (
    <aside
      {...props}
      className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-border/50 bg-background py-5 sm:flex"
    >
      <nav className="flex flex-col items-center gap-1">
        {children}

        <Separator className="my-1 w-1/3" />
        {navItems.map((item) => {
          const Icon = Icons[item.icon]
          const url = `/${orgSlug}${item.href}`
          const active = url === pathname
          console.log(active)
          return (
            <Tooltip key={item.title} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={url}
                  className={cn(
                    buttonVariants({
                      variant: active ? "outline" : "ghost",
                      size: "icon",
                    }),
                    "size-9",
                    {
                      "bg-accent/50": active,
                    }
                  )}
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.title}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-1">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-9"
              )}
            >
              <Icons.bell className="size-4" />
              <span className="sr-only">Notificações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            Notificações
          </TooltipContent>
        </Tooltip>

        <ThemeToggle />

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-9"
              )}
            >
              <Icons.logout className="size-4" />
              <span className="sr-only">Sair</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            Sair
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
