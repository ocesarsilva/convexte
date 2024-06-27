import { type NavItem } from "@/types"

export const appConfig = {
  navItems: [
    {
      title: "Home",
      href: "",
      icon: "house",
    },
    {
      title: "Chats",
      href: "/chats",
      icon: "messagecircle",
    },
    {
      title: "Funis de venda",
      href: "/pipelines",
      icon: "briefcase",
    },
    {
      title: "Webhooks",
      href: "/webhooks",
      icon: "webhook",
    },
    {
      title: "Ajuda",
      href: "/help",
      icon: "headset",
    },
    {
      title: "Configuração",
      href: "/settings",
      icon: "settings",
    },
  ] satisfies NavItem[],
  settingsNavItems: [
    {
      title: "Geral",
      href: "/settings",
    },
    {
      title: "Aparência",
      href: "/settings/appearance",
    },
    {
      title: "Avançado",
      href: "/settings/advanced",
    },
  ],
}
