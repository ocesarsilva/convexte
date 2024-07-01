"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { updateUser } from "@/lib/actions/user"
import {
  updateAccountWithoutEmailSchema,
  type UpdateAccountWithoutEmailSchema,
} from "@/lib/validators/account"
import { LoadingButton } from "@/components/ui/loading-button"
import { UpdateAccountWithoutEmailForm } from "@/components/forms/update-account-without-email-form"

import { StepHeader } from "./text-header"

export function UpdateAccount({ userId }: { userId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCreatePending, startCreateTransaction] = React.useTransition()

  const form = useForm<UpdateAccountWithoutEmailSchema>({
    resolver: zodResolver(updateAccountWithoutEmailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      avatar: "",
    },
  })

  function onSubmit(input: UpdateAccountWithoutEmailSchema) {
    startCreateTransaction(async () => {
      const { data, error } = await updateUser({ ...input, userId })

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("step", "create-organization")
        router.push(`/onboarding?${newSearchParams.toString()}`)
      }

      // form.reset()
    })
  }

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
        className="flex flex-col space-y-4 rounded-xl bg-background/60 p-8 text-center"
      >
        <StepHeader
          title="Vamos começar configurando sua conta"
          description="Você pode atualizar as informações da sua conta mais tarde"
        />
        <motion.div
          className="mt-10"
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: "spring" },
            },
          }}
        >
          <UpdateAccountWithoutEmailForm
            form={form}
            onSubmit={onSubmit}
            className="text-start"
          >
            <LoadingButton loading={isCreatePending} disabled={isCreatePending}>
              Continuar
            </LoadingButton>
          </UpdateAccountWithoutEmailForm>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
