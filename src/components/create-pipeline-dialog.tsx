"use client"

import * as React from "react"
// import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { createPipeline } from "@/lib/actions/pipeline"
import { useMediaQuery } from "@/lib/hooks/use-media-query"
import {
  createPipelineSchema,
  type CreatePipelineSchema,
} from "@/lib/validators/pipeline"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { CreatePipelineForm } from "./forms/create-pipeline-form"
import { LoadingButton } from "./ui/loading-button"

interface CreatePipelineDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  orgSlug: string
}

export function CreatePipelineDialog({
  orgSlug,
  onOpenChange,
  ...props
}: CreatePipelineDialogProps) {
  // const router = useRouter()
  const [isCreatePending, startCreateTransaction] = React.useTransition()
  const isDesktop = useMediaQuery("(min-width: 640px)")

  const form = useForm<CreatePipelineSchema>({
    resolver: zodResolver(createPipelineSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  function onSubmit(input: CreatePipelineSchema) {
    startCreateTransaction(async () => {
      const { data, error } = await createPipeline({ ...input, orgSlug })

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        // todo: redirect to pipeline path
        toast.success("Funil de venda criado com sucesso!")
      }

      onOpenChange?.(false)
      form.reset()
    })
  }

  if (isDesktop) {
    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            form.reset()
          }
          onOpenChange?.(false)
        }}
        {...props}
      >
        <DialogTrigger asChild>
          <Button size="sm">Novo Funil</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Criar um novo funil</DialogTitle>
            <DialogDescription>
              Crie uma novo funil para gerenciar seus leads
            </DialogDescription>
          </DialogHeader>
          <CreatePipelineForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="grid w-full grid-cols-2 pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Fechar
                </Button>
              </DialogClose>
              <LoadingButton
                type="submit"
                disabled={isCreatePending}
                loading={isCreatePending}
              >
                Criar
              </LoadingButton>
            </DialogFooter>
          </CreatePipelineForm>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
        }
        onOpenChange?.(open)
      }}
      {...props}
    >
      <DrawerTrigger asChild>
        <Button size="sm">Novo Funil</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Criar um novo funil</DrawerTitle>
          <DrawerDescription>
            Crie uma novo funil para gerenciar seus leads
          </DrawerDescription>
        </DrawerHeader>
        <CreatePipelineForm form={form} onSubmit={onSubmit} className="px-4">
          <DrawerFooter className="flex-col-reverse px-0">
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Fechar
              </Button>
            </DrawerClose>
            <LoadingButton
              type="submit"
              disabled={isCreatePending}
              loading={isCreatePending}
            >
              Criar
            </LoadingButton>
          </DrawerFooter>
        </CreatePipelineForm>
      </DrawerContent>
    </Drawer>
  )
}
