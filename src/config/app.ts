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
  ] satisfies NavItem[],
}
