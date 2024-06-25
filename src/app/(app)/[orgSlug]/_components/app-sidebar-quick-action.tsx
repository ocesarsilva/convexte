import { PenSquare, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AppSidebarQuickAction({
  isSheet = false,
}: {
  isSheet?: boolean
}) {
  if (isSheet) {
    return (
      <div className="flex flex-row space-y-1 px-2">
        <Button
          variant="outline"
          className="size-9 flex-1 justify-start shadow-sm"
        >
          <PenSquare className="size-4" />
          <span>Novo Lead</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded shadow-sm"
        >
          <Search className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center space-y-1 pt-4">
      <button className="flex size-9 items-center justify-center rounded transition-colors hover:bg-accent">
        <PenSquare className="size-4" />
        <span className="sr-only">Adicionar novo lead</span>
      </button>

      <button className="flex size-9 items-center justify-center rounded transition-colors hover:bg-accent">
        <Search className="size-4" />
        <span className="sr-only">Procurar</span>
      </button>
    </div>
  )
}
