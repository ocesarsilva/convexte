"use client"

import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

interface SettingsTabsbarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
  orgSlug: string
}

export const SettingsPipelineTabsbar = ({
  items,
  orgSlug,
}: SettingsTabsbarProps) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="no-scrollbar sticky inset-0 z-10 flex shrink-0 overflow-x-auto lg:hidden">
      {items.map((item, index) => (
        <div
          className={cn(
            "flex grow cursor-pointer justify-around whitespace-nowrap border-b px-3 py-2 text-sm",
            pathname === `/${orgSlug}${item.href}`
              ? "flex grow cursor-pointer justify-around whitespace-nowrap border-b-2 border-primary px-3 py-2 text-sm"
              : ""
          )}
          key={index}
          onClick={() => router.push(`/${orgSlug}${item.href}`)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}
