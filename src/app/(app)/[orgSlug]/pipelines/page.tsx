import { getPipelinesByOrgSlug } from "@/lib/queries/pipeline"
import { CreatePipelineDialog } from "@/components/create-pipeline-dialog"
import { PageHeader } from "@/components/layout/page-header"

import { PipelinesList } from "./_components/pipelines"

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

      <div className="vertical-scrollbar scrollbar-lg h-full w-full overflow-y-auto p-8">
        <PipelinesList pipelinesPromise={pipelinesPromise} />
      </div>
    </>
  )
}
