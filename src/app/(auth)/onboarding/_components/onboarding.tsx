// @see https://github.com/juliusmarminge/acme-corp/blob/main/apps/nextjs/src/app/(dashboard)/onboarding/multi-step-form.tsx

"use client"

import { useSearchParams } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { CreateCompany } from "./create-company"
import { Intro } from "./intro"

export function Onboarding() {
  const search = useSearchParams()
  const step = search.get("step")

  return (
    <AnimatePresence mode="wait">
      {!step && <Intro key="intro" />}
      {step === "create" && <CreateCompany />}
    </AnimatePresence>
  )
}
