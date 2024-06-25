"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { type Organization } from "@/server/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { updateOrganization } from "@/lib/actions/organization"
import {
  updateOrganizationSchema,
  type UpdateOrganizationSchema,
} from "@/lib/validators/organization"
import { UpdateOrganizationForm } from "@/components/forms/update-organization-form"
import { LoadingButton } from "@/components/loading-button"

interface UpdateOrganizationProps {
  org: Pick<Organization, "name" | "slug">
}

export function UpdateOrganization({ org }: UpdateOrganizationProps) {
  const router = useRouter()

  const [isCreatePending, startCreateTransaction] = React.useTransition()

  const form = useForm<UpdateOrganizationSchema>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: {
      name: org.name,
    },
  })

  function onSubmit(input: UpdateOrganizationSchema) {
    startCreateTransaction(async () => {
      const { data, error } = await updateOrganization({
        ...input,
        orgSlug: org.slug,
      })

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        router.push(`/${data.slug}/settings`)
      }
    })
  }

  return (
    <UpdateOrganizationForm
      form={form}
      onSubmit={onSubmit}
      className="text-start"
    >
      <LoadingButton
        className="w-fit"
        loading={isCreatePending}
        disabled={isCreatePending}
      >
        Salvar
      </LoadingButton>
    </UpdateOrganizationForm>
  )
}
