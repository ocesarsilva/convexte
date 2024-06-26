"use client"

import * as React from "react"
import { type UseFormReturn } from "react-hook-form"

import { cn, slugify } from "@/lib/utils"
import { type CreatePipelineSchema } from "@/lib/validators/pipeline"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface CreatePipelineFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode
  form: UseFormReturn<CreatePipelineSchema>
  onSubmit: (data: CreatePipelineSchema) => void
}

export function CreatePipelineForm({
  children,
  form,
  onSubmit,
  className,
  ...props
}: CreatePipelineFormProps) {
  const nameState = form.watch("name")

  React.useEffect(() => {
    form.setValue("slug", slugify(nameState))
  }, [nameState])

  return (
    <Form {...form}>
      <form
        className={cn("grid w-full gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome do funil de vendas aqui"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  disabled
                  placeholder="Slug do seu funil de vendas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
