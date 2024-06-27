import { PenSquare, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AppSidebarQuickAction({
  isSheet = false,
}: {
  isSheet?: boolean
}) {
  return (
    <div className="flex w-full items-center justify-center gap-1 py-2 sm:flex-col sm:p-0 sm:pt-3">
      <Button
        size={isSheet ? "sm" : "icon"}
        variant={isSheet ? "outline" : "ghost"}
        className={cn({ "flex-1 justify-start gap-2": isSheet })}
      >
        <PenSquare className="size-4" />
        <span className="sm:hidden">Novo Lead</span>
      </Button>
      <Button
        size="icon"
        variant={isSheet ? "outline" : "ghost"}
        className={cn("size-9", { "size-8": isSheet })}
      >
        <Search className="size-4" />
      </Button>
    </div>
  )
}
