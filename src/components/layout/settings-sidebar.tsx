"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
  orgSlug: string
}

export function SettingsSidebar({ items, orgSlug, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav className="grid gap-4 text-sm text-muted-foreground" {...props}>
      {items.map((item) => {
        const href = `/${orgSlug}${item.href}`
        const active = href === pathname

        return (
          <Link
            key={item.href}
            href={`/${orgSlug}${item.href}`}
            className={cn("hover:text-primary", {
              "font-semibold text-primary": active,
            })}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
