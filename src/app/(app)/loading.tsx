import { Loader2 } from "lucide-react"

export default function AppLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-6 animate-spin" />
    </div>
  )
}
