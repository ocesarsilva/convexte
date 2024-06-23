"use client"

import * as React from "react"

import Link from "next/link"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { appConfig } from "@/config/app"
import { Icons } from "@/components/icons"
import { useSelectedLayoutSegment } from "next/navigation"
import { cn } from "@/lib/utils"

import { PenSquare, Search } from "lucide-react"

export function AppSidebar() {
  const segment = useSelectedLayoutSegment()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-border/50 bg-background sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        <Link
          href="#"
          className="flex size-6 items-center justify-center rounded bg-primary text-base font-semibold text-primary-foreground"
        >
          <span className="flex size-2 items-center justify-center text-center text-sm">C</span>
          <span className="sr-only">Acme Inc</span>
        </Link>

        <div className="flex w-full flex-col items-center gap-2 py-2">
          <button className="flex h-8 w-full items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <PenSquare className="size-4" />
            <span className="sr-only">Adicionar novo lead</span>
          </button>

          <button className="flex h-8 w-full items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Search className="size-4" />
            <span className="sr-only">Procurar</span>
          </button>
        </div>

        {appConfig.navItems.map((item) => {
          const Icon = Icons[item.icon]
          const active = segment === item.segment

          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    "flex h-8 w-full items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                    { "bg-accent/50 text-accent-foreground": active },
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
                "flex h-8 w-full items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                { "bg-accent/50 text-accent-foreground": segment === "settings" },
              )}
            >
              <Icons.settings className="size-4" />
              <span className="sr-only">Configurações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configurações</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
