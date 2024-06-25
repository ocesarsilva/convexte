"use client"

import { forwardRef } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading = false, className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={props.disabled ? props.disabled : loading}
        className={cn(className)}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>{children}</>
        )}
      </Button>
    )
  }
)

LoadingButton.displayName = "LoadingButton"

export { LoadingButton }
