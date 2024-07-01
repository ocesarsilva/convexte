"use client"

import * as React from "react"
import { type UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { type UpdateAccountSchema } from "@/lib/validators/account"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface UpdateAccountFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode
  form: UseFormReturn<UpdateAccountSchema>
  onSubmit: (data: UpdateAccountSchema) => void
}

export function UpdateAccountForm({
  children,
  form,
  onSubmit,
  className,
  ...props
}: UpdateAccountFormProps) {
  return (
    <Form {...form}>
      <form
        className={cn("grid w-full gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        {...props}
      >
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o seu nome aqui" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Digite o seu sobrenome aqui"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="cursor-not-allowed"
                  readOnly
                  disabled
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
