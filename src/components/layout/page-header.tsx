import { SheetToggleButton } from "../sheet-toggle-button"

interface PageHeaderProps {
  children?: React.ReactNode
  title: string
}

export function PageHeader({ children, title }: PageHeaderProps) {
  return (
    <header className="relative z-[15] flex h-[3.75rem] w-full shrink-0 flex-row items-center justify-between border-b bg-background p-4">
      <div className="flex flex-row items-center gap-2">
        <SheetToggleButton />

        <h2 className="font-semibold tracking-tight sm:text-lg">{title}</h2>
      </div>

      {children}
    </header>
  )
}
