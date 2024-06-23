"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Paths } from "@/lib/constants"
import { slugify } from "@/lib/utils"
import {
  createCompanySchema,
  type CreateCompanySchema,
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

import { StepHeader } from "./text-header"

export function CreateCompany() {
  const router = useRouter()
  const [isCreatePending, startCreateTransaction] = React.useTransition()

  const form = useForm<CreateCompanySchema>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  const createCompany = api.company.create.useMutation()

  const onSubmit = form.handleSubmit(async (values) => {
    startCreateTransaction(async () => {
      await createCompany.mutateAsync(
        { ...values },
        {
          onSuccess: () => {
            router.refresh()
            setTimeout(() => {
              router.push(Paths.Login)
            }, 100)
            toast.success("Empresa criada com sucesso!")
          },
          onError: (error) => {
            toast.error(
              error.message ?? "Acorreu um erro ao criar sua empresa."
            )
          },
        }
      )
    })
  })

  const nameState = form.watch("name")

  React.useEffect(() => {
    form.setValue("slug", slugify(nameState))
  }, [nameState])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="flex flex-col space-y-4 rounded-xl bg-background/60 p-8"
      >
        <StepHeader
          title="Vamos começar criando sua empresa"
          description="Você pode atualizar o nome da sua loja mais tarde"
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: "spring" },
            },
          }}
        >
          <Form {...form}>
            <form
              className={"grid w-full gap-4"}
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome da empresa aqui."
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
                        placeholder="Slug do sua empresa."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                loading={isCreatePending}
                disabled={isCreatePending}
              >
                Salvar
              </LoadingButton>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
