import { Icons } from "@/components/icons"
import { PageHead } from "@/components/page-head"

import { SettingsSidebar } from "./_components/settings-sidebar"

const sidebarNavItems = [
  {
    title: "Geral",
    href: "/settings",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
  },
  {
    title: "Notificações",
    href: "/settings/notifications",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <PageHead
        title="Configurações"
        icon={<Icons.settings className="size-4" />}
      />
      <div className="space-y-6 p-10 pb-16">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebar items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
