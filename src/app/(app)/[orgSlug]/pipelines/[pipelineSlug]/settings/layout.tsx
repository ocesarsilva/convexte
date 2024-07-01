import { notFound } from "next/navigation"

import { appConfig } from "@/config/app"
import { getPipelineBySlug } from "@/lib/queries/pipeline"
import { PageHeader } from "@/components/layout/page-header"
import { SettingsSidebar } from "@/components/layout/settings-sidebar"
import { PageBreadCrumbs } from "@/components/page-breadcrumbs"
import { Wrapper } from "@/components/wrapper"

interface SettingsLayoutProps {
  children: React.ReactNode
  params: {
    orgSlug: string
    pipelineSlug: string
  }
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const { orgSlug, pipelineSlug } = params
  const { settingsNavItems } = appConfig

  const pipeline = await getPipelineBySlug(pipelineSlug)

  if (!pipeline) {
    notFound()
  }

  return (
    <>
      <PageHeader
        header={
          <PageBreadCrumbs
            root={{
              label: pipeline.name,
              href: `/${orgSlug}/pipelines/${pipelineSlug}`,
            }}
            items={[
              {
                label: "Configurações",
                href: `/${orgSlug}/pipelines/${pipelineSlug}/settings`,
              },
            ]}
          />
        }
      />

      <Wrapper variant="settings">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <SettingsSidebar orgSlug={orgSlug} items={settingsNavItems} />

          {children}
        </div>
      </Wrapper>
    </>
  )
}
