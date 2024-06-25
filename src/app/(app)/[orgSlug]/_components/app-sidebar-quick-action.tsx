import { PenSquare, Search } from "lucide-react"

export function AppSidebarQuickAction() {
  return (
    <div className="my-2 flex w-full flex-col items-center gap-2">
      <button className="flex h-8 w-full items-center justify-center rounded transition-colors hover:bg-accent">
        <PenSquare className="size-4" />
        <span className="sr-only">Adicionar novo lead</span>
      </button>

      <button className="flex h-8 w-full items-center justify-center rounded transition-colors hover:bg-accent">
        <Search className="size-4" />
        <span className="sr-only">Procurar</span>
      </button>
    </div>
  )
}
