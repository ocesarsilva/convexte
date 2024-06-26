"use client"

import { useSidebar } from "@/contexts/sidebar-provider"
import { Menu } from "lucide-react"

import { Button } from "./ui/button"

export function SheetToggleButton() {
  const { setOpen } = useSidebar()

  return (
    <Button
      variant="outline"
      size="icon"
      className="sm:hidden"
      onClick={() => setOpen((prev) => !prev)}
    >
      <Menu className="size-4" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  )
}
