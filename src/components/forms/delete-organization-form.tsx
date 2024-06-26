import { deleteOrganization } from "@/lib/actions/organization"

import { SubmitButton } from "../ui/submit-button"

interface DeleteOrganizationFormProps {
  orgSlug: string
}

export function DeleteOrganizationForm({
  orgSlug,
}: DeleteOrganizationFormProps) {
  return (
    <form action={deleteOrganization} className="w-full">
      <input name="orgSlug" value={orgSlug} className="sr-only" />
      <SubmitButton className="ml-auto" variant="destructive">
        Excluir
      </SubmitButton>
    </form>
  )
}
