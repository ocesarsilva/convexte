import Image from "next/image"
import Link from "next/link"
import { type Pipeline } from "@/server/db/schema"
import { LinkIcon, Settings } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface PipelineCardProps {
  pipeline: Pipeline
}

export function PipelineCard({ pipeline }: PipelineCardProps) {
  return (
    <Link
      href={`/`}
      className="border-custom-border-200 bg-custom-background-100 flex flex-col rounded border"
    >
      <div className="relative h-[118px] w-full rounded-t ">
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 to-transparent" />

        <Image
          src={
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          fill
          alt="project image"
          className="absolute left-0 top-0 h-full w-full rounded-t object-cover"
        />

        <div className="absolute bottom-4 z-[1] flex h-10 w-full items-center justify-between gap-3 px-4">
          <div className="flex flex-grow items-center gap-2.5 truncate">
            <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded bg-white/90">
              <Icons.briefcase className="size-5 text-primary-foreground" />
            </div>

            <div className="flex w-full flex-col justify-between gap-0.5 truncate">
              <h3 className="truncate font-semibold text-primary">
                {pipeline.name}
              </h3>
              <span className="flex items-center gap-1.5">
                <p className="text-xs font-medium text-white">
                  {pipeline.slug}
                </p>
              </span>
            </div>
          </div>

          <div className="flex h-full flex-shrink-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-6 bg-white/10 hover:bg-white/30"
            >
              <LinkIcon className="size-3 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex h-[104px] w-full flex-col justify-between rounded-b p-4",
          {
            "opacity-90": true,
          }
        )}
      >
        <p className="text-custom-text-300 line-clamp-2 break-words text-sm">
          Criado em
          {/* {project.description && project.description.trim() !== ""
            ? project.description
            : `Created on ${renderFormattedDate(project.created_at)}`} */}
        </p>
        <div className="item-center flex justify-between">
          <Link
            className="text-custom-text-400 hover:bg-custom-background-80 hover:text-custom-text-200 flex items-center justify-center rounded p-1"
            href={`/`}
          >
            <Settings className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Link>
  )
}
