"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type Pipeline } from "@/server/db/schema"
import { LinkIcon, Settings } from "lucide-react"

import { cn, formatPrice } from "@/lib/utils"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

interface PipelineCardProps {
  pipeline: Pipeline
  orgSlug: string
}

export function PipelineCard({ pipeline, orgSlug }: PipelineCardProps) {
  const router = useRouter()

  return (
    <Link
      href={`/${orgSlug}/pipelines/${pipeline.slug}`}
      className="flex flex-col rounded border"
    >
      <div className="relative h-[118px] w-full rounded-t">
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute right-2 top-2 z-10 w-fit rounded-sm">
          Ativo
        </Badge>
        <Image
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          priority={false}
          alt="project image"
          className="absolute left-0 top-0 size-full rounded-t object-cover"
        />

        <div className="absolute bottom-4 z-[1] flex h-10 w-full items-center justify-between gap-3 px-4">
          <div className="flex grow items-center gap-2.5 truncate">
            <div className="grid size-9 shrink-0 place-items-center rounded bg-white">
              <Icons.briefcase className="size-5 text-black" />
            </div>

            <div className="flex w-full flex-col justify-between gap-0.5 truncate">
              <h3 className="truncate font-semibold text-white">
                {pipeline.name}
              </h3>
              <span className="flex items-center gap-1.5">
                <p className="text-xs font-medium text-white">
                  {pipeline.slug}
                </p>
              </span>
            </div>
          </div>

          <div className="flex h-full shrink-0 items-center gap-2"></div>
        </div>
      </div>

      <div
        className={cn(
          "flex h-[90px] w-full flex-col justify-between rounded-b p-4 text-xs",
          {
            "opacity-90": true,
          }
        )}
      >
        <div className="flex flex-1 items-end justify-between">
          <div>
            <p>Leads: 2380</p>
            <p>Faturamento: {formatPrice(12304)}</p>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-7 bg-white/10">
              <LinkIcon className="size-3 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 bg-white/10"
              onClick={() =>
                router.push(`/${orgSlug}/pipelines/${pipeline.slug}/settings`)
              }
            >
              <Settings className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
