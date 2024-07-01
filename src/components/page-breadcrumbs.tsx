"use client"

import React from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface PageBreadCrumbsProps {
  root: {
    label: string
    href: string
  }
  items?: {
    label: string
    href: string
  }[]
}

export function PageBreadCrumbs({ root, items }: PageBreadCrumbsProps) {
  const pathname = usePathname()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={root.href}>
            <BreadcrumbEllipsis
              className={cn("size-4 sm:hidden", { hidden: !items })}
            />
            <span
              className={cn("hidden sm:flex", {
                "font-semibold text-foreground": pathname === root.href,
                block: !items,
              })}
            >
              {root.label}
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items?.map((item, idx) => {
          const active = pathname === item.href

          return (
            <React.Fragment key={idx}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={cn({
                    "font-semibold text-foreground": active,
                  })}
                  href={item.href}
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
