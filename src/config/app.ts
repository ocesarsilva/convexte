import { type NavItem } from "@/types"

export const appConfig = {
  navItems: [
    {
      title: "Home",
      href: "/",
      icon: "house",
      segment: null,
    },
    {
      title: "Chats",
      href: "/chats",
      icon: "messagecircle",
      segment: "chats",
    },
    {
      title: "Funis de venda",
      href: "/pipelines",
      icon: "briefcase",
      segment: "pipelines",
    },
    {
      title: "Webhooks",
      href: "/webhooks",
      icon: "webhook",
      segment: "webhooks",
    },
    {
      title: "Ajuda",
      href: "/help",
      icon: "headset",
      segment: "help",
    },
    {
      title: "Configuração",
      href: "/settings",
      icon: "settings",
      segment: "settings",
    },
  ] satisfies NavItem[],
  settingsNavItems: [
    {
      title: "Geral",
      href: "/settings",
    },
    {
      title: "Membros",
      href: "/members",
    },
    {
      title: "Aparência",
      href: "/settings/appearance",
    },
    {
      title: "Notificações",
      href: "/settings/notifications",
    },
    {
      title: "API Tokens",
      href: "/settings/api-tokens",
    },
    {
      title: "Avançado",
      href: "/settings/advanced",
    },
  ],
}
