import { AppSidebarSheet } from "@/app/(app)/[orgSlug]/_components/app-sidebar-sheet"

interface PageHeadProps {
  title: string
  icon: React.ReactElement
  children?: React.ReactNode
}

export function PageHead({ title, icon, children }: PageHeadProps) {
  return (
    <header className="z-10 flex w-full items-center border-b">
      <div className="z-10 flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 p-4">
        <div className="flex flex-row items-center gap-2">
          <AppSidebarSheet />
          <div className="flex flex-row items-center gap-2">
            {icon}
            <span className="text-sm">{title}</span>
          </div>
        </div>

        {children}
      </div>
    </header>
  )
}
