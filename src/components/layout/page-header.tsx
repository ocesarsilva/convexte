import { SheetToggleButton } from "../sheet-toggle-button"

interface PageHeaderProps {
  header: React.ReactNode
  children?: React.ReactNode
}

export function PageHeader({ children, header }: PageHeaderProps) {
  return (
    <header className="relative z-[15] flex h-[3.75rem] w-full shrink-0 flex-row items-center justify-between border-b bg-background p-4">
      <div className="flex flex-row items-center gap-2">
        <SheetToggleButton />

        {header}
      </div>

      {children}
    </header>
  )
}
