"use client"

import { useSearchParams } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { CreateCompany } from "./create-organization"
import { Intro } from "./intro"
import { UpdateAccount } from "./update-account"

interface OnboardingProps {
  userId: string
}

export function Onboarding({ userId }: OnboardingProps) {
  const search = useSearchParams()
  const step = search.get("step")

  return (
    <AnimatePresence mode="wait">
      {!step && <Intro key="intro" />}
      {step === "create-account" && <UpdateAccount userId={userId} />}
      {step === "create-organization" && <CreateCompany userId={userId} />}
    </AnimatePresence>
  )
}
