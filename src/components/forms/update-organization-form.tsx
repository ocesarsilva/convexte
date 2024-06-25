"use client"

import * as React from "react"
import { type UseFormReturn } from "react-hook-form"

import { cn, slugify } from "@/lib/utils"
import { type UpdateOrganizationSchema } from "@/lib/validators/organization"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface UpdateOrganizationFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode
  form: UseFormReturn<UpdateOrganizationSchema>
  onSubmit: (data: UpdateOrganizationSchema) => void
}

export function UpdateOrganizationForm({
  children,
  form,
  onSubmit,
  className,
  ...props
}: UpdateOrganizationFormProps) {
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
                  placeholder="Digite o nome da organização aqui"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Slug</FormLabel>
          <FormControl>
            <Input
              readOnly
              disabled
              placeholder="Slug do sua organização"
              value={slugify(form.watch("name"))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {children}
      </form>
    </Form>
  )
}
