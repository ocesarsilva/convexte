"use client"

import React from "react"

import { type getPipelinesByOrgSlug } from "@/lib/queries/pipeline"
import { PipelineCard } from "@/components/cards/pipeline-card"

interface PipelinesListProps {
  pipelinesPromise: ReturnType<typeof getPipelinesByOrgSlug>
}

export function PipelinesList({ pipelinesPromise }: PipelinesListProps) {
  const pipelines = React.use(pipelinesPromise)

  if (pipelines.length < 1) {
    return <p>Nenhum resultado...</p>
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {pipelines.map((pipeline) => (
        <PipelineCard pipeline={pipeline} />
      ))}
    </div>
  )
}
