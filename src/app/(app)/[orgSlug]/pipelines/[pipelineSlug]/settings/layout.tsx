import { appConfig } from "@/config/app"
import { PageHeader } from "@/components/layout/page-header"
import { Wrapper } from "@/components/wrapper"

import { SettingsPipelineSidebar } from "./_components/settings-pipeline-sidebar"
import { SettingsPipelineTabsbar } from "./_components/settings-pipeline-tabsbar"

interface SettingsLayoutProps {
  children: React.ReactNode
  params: {
    orgSlug: string
  }
}

export default function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const orgSlug = decodeURIComponent(params.orgSlug)
  const { settingsNavItems } = appConfig

  return (
    <>
      <PageHeader title="Configurações" />
      <SettingsPipelineTabsbar orgSlug={orgSlug} items={settingsNavItems} />
      <Wrapper>
        <div className="mx-auto flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SettingsPipelineSidebar orgSlug={orgSlug} items={settingsNavItems} />

          <div className="flex-1">{children}</div>
        </div>
      </Wrapper>
    </>
  )
}
