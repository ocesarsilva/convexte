"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

interface AppSidebarProps {
  children: React.ReactNode
}

export function AppSidebar({ children }: AppSidebarProps) {
  const segment = useSelectedLayoutSegment()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-border/50 bg-background sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        {children}
        {appConfig.navItems.map((item) => {
          const Icon = Icons[item.icon]
          const active = segment === item.segment

          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-8 w-full items-center justify-center rounded transition-colors hover:bg-muted/50",
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
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                "flex h-8 w-full items-center justify-center rounded transition-colors hover:bg-muted"
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
