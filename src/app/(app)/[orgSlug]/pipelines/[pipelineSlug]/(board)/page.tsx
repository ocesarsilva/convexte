"use clinet"

import Link from "next/link"
import { notFound } from "next/navigation"

import { getPipelineBySlug } from "@/lib/queries/pipeline"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { PageHeader } from "@/components/layout/page-header"
import { PageBreadCrumbs } from "@/components/page-breadcrumbs"

interface SettingsPipelinePageProps {
  params: {
    pipelineSlug: string
    orgSlug: string
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
      <PageHeader
        header={
          <PageBreadCrumbs
            root={{
              label: pipeline.name,
              href: `/${params.orgSlug}/pipelines/${pipeline.slug}`,
            }}
          />
        }
      >
        <div className="flex items-center space-x-2">
          <Button size="sm">Automatize</Button>
          <Button variant="outline" className="size-8" size="icon" asChild>
            <Link
              href={`/${params.orgSlug}/pipelines/${pipeline.slug}/settings`}
            >
              <Icons.settings className="size-4" />
            </Link>
          </Button>
        </div>
      </PageHeader>
    </>
  )
}
