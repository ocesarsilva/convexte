"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
  orgSlug: string
}

export function SettingsPipelineSidebar({
  className,
  items,
  orgSlug,
  ...props
}: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="-mx-4 lg:w-[310px]">
      <nav
        className={cn("hidden flex-col space-x-0 space-y-1 lg:flex", className)}
        {...props}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={`/${orgSlug}${item.href}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === `/${orgSlug}${item.href}`
                ? "bg-muted hover:bg-muted"
                : "hover:bg-muted/40  ",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
