import { getPipelinesByOrgSlug } from "@/lib/queries/pipeline"
import { CreatePipelineDialog } from "@/components/create-pipeline-dialog"
import { PageHeader } from "@/components/layout/page-header"
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
      <PageHeader title="Funis de venda" icon="briefcase">
        <CreatePipelineDialog orgSlug={orgSlug} />
      </PageHeader>

      <Wrapper>
        {/* TODO: add skeleton */}
        <PipelinesList pipelinesPromise={pipelinesPromise} />
      </Wrapper>
    </>
  )
}
