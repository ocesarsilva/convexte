import { redirect } from "next/navigation"
import { VerificiationWarning } from "./_components/verificiation-warning"
import { Paths } from "@/lib/constants"
import { validateRequest } from "@/lib/auth/validate-request"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)

  if (!user.companyId) redirect("/onboarding")

  return (
    <div className="container min-h-[calc(100vh-180px)] px-2 pt-6 md:px-4">
      <main className="w-full space-y-4">
        <VerificiationWarning />
        <div>{children}</div>
      </main>
    </div>
  )
}
