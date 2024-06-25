import { Providers } from "@/contexts/providers"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <Providers>{children}</Providers>
}
