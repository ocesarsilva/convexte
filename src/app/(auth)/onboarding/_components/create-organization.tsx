"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { createOrganization } from "@/lib/actions/organization"
import { slugify } from "@/lib/utils"
import {
  createOrganizationSchema,
  type CreateOrganizationSchema,
} from "@/lib/validators/organization"
import { CreateOrganizationForm } from "@/components/forms/create-organization-form"
import { LoadingButton } from "@/components/loading-button"

import { StepHeader } from "./text-header"

export function CreateCompany({ userId }: { userId: string }) {
  const router = useRouter()

  const [isCreatePending, startCreateTransaction] = React.useTransition()

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
      }

      form.reset()
    })
  }

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
          title="Vamos começar criando sua organização"
          description="Você pode atualizar o nome da sua org mais tarde"
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
          <CreateOrganizationForm form={form} onSubmit={onSubmit}>
            <LoadingButton loading={isCreatePending} disabled={isCreatePending}>
              Salvar
            </LoadingButton>
          </CreateOrganizationForm>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
