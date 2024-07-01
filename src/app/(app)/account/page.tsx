import { notFound } from "next/navigation"

import { validateRequest } from "@/lib/auth/validate-request"

export default async function ProfilePage() {
  const { user } = await validateRequest()

  if (!user) {
    notFound()
  }

  return <div>{user.email}</div>
}
