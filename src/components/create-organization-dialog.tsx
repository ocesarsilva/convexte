"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { createOrganization } from "@/lib/actions/organization"
import { useMediaQuery } from "@/lib/hooks/use-media-query"
import {
  createOrganizationSchema,
  type CreateOrganizationSchema,
} from "@/lib/validators/organization"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import { CreateOrganizationForm } from "./forms/create-organization-form"
import { LoadingButton } from "./ui/loading-button"

interface CreateOrganizationDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  userId: string
}

export function CreateOrganizationDialog({
  userId,
  onOpenChange,
  ...props
}: CreateOrganizationDialogProps) {
  const router = useRouter()
  const [isCreatePending, startCreateTransaction] = React.useTransition()
  const isDesktop = useMediaQuery("(min-width: 640px)")

  const form = useForm<CreateOrganizationSchema>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  function onSubmit(input: CreateOrganizationSchema) {
    startCreateTransaction(async () => {
      const { data, error } = await createOrganization({ ...input, userId })

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        router.push(`/${data.slug}`)
        toast.success("Organização criada!")
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Criar um nova organização</DialogTitle>
            <DialogDescription>
              Crie uma nova organização para gerenciar seus leads
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm form={form} onSubmit={onSubmit}>
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
          </CreateOrganizationForm>
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
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Criar um nova organização</DrawerTitle>
          <DrawerDescription>
            Crie uma nova organização para gerenciar seus leads
          </DrawerDescription>
        </DrawerHeader>
        <CreateOrganizationForm
          form={form}
          onSubmit={onSubmit}
          className="px-4"
        >
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
        </CreateOrganizationForm>
      </DrawerContent>
    </Drawer>
  )
}
