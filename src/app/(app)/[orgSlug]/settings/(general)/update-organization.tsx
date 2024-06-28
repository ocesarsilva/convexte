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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoadingButton } from "@/components/ui/loading-button"
import { UpdateOrganizationForm } from "@/components/forms/update-organization-form"

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
    <Card>
      <CardHeader>
        <CardTitle>Nome da organização</CardTitle>
        <CardDescription>
          Usado para identificar sua area de trabalho
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateOrganizationForm
          form={form}
          onSubmit={onSubmit}
          className="text-start"
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <LoadingButton
          onClick={form.handleSubmit(onSubmit)}
          className="w-28"
          loading={isCreatePending}
          disabled={isCreatePending}
        >
          Salvar
        </LoadingButton>
      </CardFooter>
    </Card>
  )
}
