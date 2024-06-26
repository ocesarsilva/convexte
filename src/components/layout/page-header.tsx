import { Icons } from "../icons"
import { SheetToggleButton } from "../sheet-toggle-button"

interface PageHeaderProps {
  children?: React.ReactNode
  title: string
  icon: keyof typeof Icons
}

export function PageHeader({ children, title, icon }: PageHeaderProps) {
  const Icon = Icons[icon]

  return (
    <header className="relative z-[15] flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 border-b bg-background p-4">
      <div className="flex flex-row gap-2">
        <SheetToggleButton />

        <div className="flex flex-row items-center">
          <Icon className="mr-2 size-4" />
          <h2 className="text-md font-semibold tracking-tight">{title}</h2>
        </div>
      </div>

      {children}
    </header>
  )
}
