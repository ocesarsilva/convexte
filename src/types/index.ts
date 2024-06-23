import { type Icons } from "@/components/icons"

export interface SearchParams {
  searchParams: Record<string, string | string[] | undefined>
}

export type NavItem = {
  title: string
  href: string
  icon: keyof typeof Icons
  segment: string | null
}
