"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { type Company } from "@/server/db/schema"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  updateCompanySchema,
  type UpdateCompanySchema,
} from "@/lib/validators/company"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button"

interface CompanyDetailsFormProps {
  company: Company
}

export function CompanyDetailsForm({ company }: CompanyDetailsFormProps) {
  const router = useRouter()
  const [isUpdatePending, startUpdateTransaction] = React.useTransition()

  const form = useForm<UpdateCompanySchema>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      name: company.name,
    },
  })

  const updateCompany = api.company.update.useMutation()

  const onSubmit = form.handleSubmit(async (values) => {
    startUpdateTransaction(async () => {
      await updateCompany.mutateAsync(
        { ...values },
        {
          onSuccess: () => {
            router.refresh()
            toast.success("Empresa atualizada com sucesso!")
          },
          onError: (error) => {
            toast.error(
              error.message ?? "Acorreu um erro ao atualizar sua empresa."
            )
          },
        }
      )
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="flex flex-row gap-3">
          <div className="flex size-20 items-center justify-center rounded-sm bg-blue-600">
            <span className="text-2xl font-bold">
              {company.name.charAt(0).toLocaleUpperCase()}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{company.name}</h3>
            <p className="text-sm text-muted-foreground">
              form.convexte.com/{company.slug}
            </p>
            <p className="text-blue-foreground text-xs hover:underline">
              Editar imagem
            </p>
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da empresa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Slug</FormLabel>
          <FormControl>
            <Input
              className="focus-visible:ring-none focus-visible:border-none"
              readOnly
              disabled
              value={`${company.slug}`}
            />
          </FormControl>
        </FormItem>

        <LoadingButton loading={isUpdatePending} type="submit">
          Salvar
        </LoadingButton>
      </form>
    </Form>
  )
}
