"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
  orgSlug: string
}

export function SettingsSidebarNav({
  className,
  items,
  orgSlug,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "no-scrollbar sticky inset-0 z-10 flex flex-shrink-0 overflow-x-auto",
        "space-x-2 md:flex lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
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
  )
}
