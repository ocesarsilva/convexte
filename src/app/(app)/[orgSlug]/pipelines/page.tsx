import { getPipelinesByOrgSlug } from "@/lib/queries/pipeline"
import { CreatePipelineDialog } from "@/components/create-pipeline-dialog"
import { PageHeader } from "@/components/layout/page-header"
import { PageBreadCrumbs } from "@/components/page-breadcrumbs"
import { Wrapper } from "@/components/wrapper"

import { PipelinesList } from "./_components/pipelines-list"

export default async function Page({
  params,
}: {
  params: {
    orgSlug: string
  }
}) {
  const { orgSlug } = params

  const pipelinesPromise = getPipelinesByOrgSlug({ orgSlug })

  return (
    <>
      <PageHeader
        header={
          <PageBreadCrumbs
            root={{
              label: "Funis de vendas",
              href: `/${params.orgSlug}/pipelines`,
            }}
          />
        }
      >
        <CreatePipelineDialog orgSlug={orgSlug} />
      </PageHeader>

      <Wrapper>
        {/* TODO: add skeleton */}
        <PipelinesList pipelinesPromise={pipelinesPromise} orgSlug={orgSlug} />
      </Wrapper>
    </>
  )
}
