"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
  orgSlug: string
  children: React.ReactNode
}

export function AppSidebar({ children, orgSlug }: AppSidebarProps) {
  const segment = useSelectedLayoutSegment()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-border/50 bg-background py-5 sm:flex">
      <nav className="flex flex-col items-center space-y-1.5 px-2">
        {children}

        <Separator className="my-4" />
        {appConfig.navItems.map((item) => {
          const Icon = Icons[item.icon]
          const active = segment === item.segment

          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={`/${orgSlug}${item.href}`}
                  className={cn(
                    "flex size-9 items-center justify-center rounded transition-colors hover:bg-muted/50",
                    {
                      "bg-muted hover:bg-muted": active,
                    }
                  )}
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          )
        })}
      </nav>

      <nav className="mt-auto flex flex-col items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                "flex size-9 items-center justify-center rounded transition-colors hover:bg-muted"
              )}
            >
              <Icons.logout className="size-4" />
              <span className="sr-only">Sair</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Sair</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
