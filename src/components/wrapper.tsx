import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const wrapperVariants = cva("grid items-center gap-8 pb-8 pt-6 lg:py-6", {
  variants: {
    variant: {
      default: "container",
      sidebar: "",
      centered: "container flex h-dvh max-w-2xl flex-col justify-center",
      settings: "flex flex-1 flex-col gap-4  p-4 md:mt-10 md:gap-8 md:p-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface WrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  as?: React.ElementType
}

function Wrapper({
  className,
  as: Comp = "section",
  variant,
  ...props
}: WrapperProps) {
  return (
    <Comp className={cn(wrapperVariants({ variant }), className)} {...props} />
  )
}

export { Wrapper, wrapperVariants }
