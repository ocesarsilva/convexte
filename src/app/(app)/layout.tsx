import { AppProviders } from "@/contexts/app-providers"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <AppProviders>{children}</AppProviders>
}
