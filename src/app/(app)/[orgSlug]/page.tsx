import { Icons } from "@/components/icons"

import { AppPageHead } from "./_components/app-page-head"

export default function Page({
  params,
}: {
  params: {
    orgSlug: string
  }
}) {
  return (
    <>
      <AppPageHead
        title="Home"
        icon={<Icons.house className="size-4" />}
        orgSlug={params.orgSlug}
      />
    </>
  )
}
