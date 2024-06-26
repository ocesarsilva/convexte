import { PenSquare, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AppSidebarQuickAction({
  isSheet = false,
}: {
  isSheet?: boolean
}) {
  return (
    <div className="flex w-full items-center justify-center gap-2 py-2 sm:flex-col">
      <Button
        size={isSheet ? "default" : "icon"}
        variant="outline"
        className={cn({ "flex-1 justify-start": isSheet })}
      >
        <PenSquare className="mr-2 size-4 sm:m-0" />
        <span className="sm:hidden">Novo Lead</span>
      </Button>
      <Button size="icon" variant="outline">
        <Search className="size-4" />
      </Button>
    </div>
  )
}
