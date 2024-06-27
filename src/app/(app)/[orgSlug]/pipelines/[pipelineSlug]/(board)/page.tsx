import { notFound } from "next/navigation"

import { getPipelineBySlug } from "@/lib/queries/pipeline"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"

interface SettingsPipelinePageProps {
  params: {
    pipelineSlug: string
  }
}

async function getPipelineFromParams(
  params: SettingsPipelinePageProps["params"]
) {
  const { pipelineSlug } = params

  const pipeline = await getPipelineBySlug(pipelineSlug)
  if (!pipeline) return null

  return pipeline
}

export default async function PipelineBoardPage({
  params,
}: SettingsPipelinePageProps) {
  const pipeline = await getPipelineFromParams(params)

  if (!pipeline) {
    notFound()
  }

  return (
    <>
      <PageHeader title={pipeline.name} icon="briefcase">
        <Button size="sm">Automatize</Button>
      </PageHeader>
    </>
  )
}
