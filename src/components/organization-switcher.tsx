"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  CaretSortIcon,
  CheckIcon,
  FrameIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { type getOrganizationsByUserId } from "@/lib/queries/organization"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CreateOrganizationDialog } from "./create-organization-dialog"

interface OrganizationSwitcherProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  userId: string
  organizationsPromise: ReturnType<typeof getOrganizationsByUserId>
  isSheet?: boolean
}

export function OrganizationSwitcher({
  userId,
  organizationsPromise,
  className,
  isSheet = false,
  ...props
}: OrganizationSwitcherProps) {
  const { orgSlug } = useParams<{ orgSlug: string }>()
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [showNewOrganizationDialog, setShowNewOrganizationDialog] =
    React.useState(false)

  const organizations = React.use(organizationsPromise)

  const selectedOrganization = organizations.find((org) => org.slug === orgSlug)

  const label = isSheet
    ? selectedOrganization?.name ?? ""
    : selectedOrganization?.name.charAt(0).toLocaleUpperCase() ?? ""

  return (
    <>
      <CreateOrganizationDialog
        userId={userId}
        open={showNewOrganizationDialog}
        onOpenChange={setShowNewOrganizationDialog}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant={isSheet ? "outline" : "default"}
            size={isSheet ? undefined : "icon"}
            aria-expanded={open}
            aria-label="Select a org"
            className={cn("size-8 justify-center", className, {
              "w-full justify-between": isSheet,
            })}
            {...props}
          >
            {label}

            {isSheet ? (
              <CaretSortIcon
                className="ml-auto size-4 shrink-0 opacity-50"
                aria-hidden="true"
              />
            ) : null}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side={isSheet ? "bottom" : "left"}
          className={cn("mt-5 p-0", {
            "mt-0 w-[var(--radix-popover-trigger-width)]": isSheet,
          })}
        >
          <Command>
            <CommandList>
              <CommandInput placeholder="Procurar organização..." />
              <CommandEmpty>Nenhum resultado.</CommandEmpty>
              <CommandGroup>
                {organizations.map((org) => (
                  <CommandItem
                    key={org.id}
                    onSelect={() => {
                      setOpen(false)
                      router.push(`/${org.slug}`)
                    }}
                    className="text-sm"
                  >
                    <FrameIcon
                      className="mr-2 size-4  text-muted-foreground"
                      aria-hidden="true"
                    />
                    {org.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto size-4",
                        selectedOrganization?.slug === org.slug
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                      aria-hidden="true"
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    setShowNewOrganizationDialog(true)
                  }}
                >
                  <PlusCircledIcon className="mr-2 size-4" aria-hidden="true" />
                  Nova organização
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
