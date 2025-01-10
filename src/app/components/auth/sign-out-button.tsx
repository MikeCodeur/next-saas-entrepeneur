/* eslint-disable unicorn/no-useless-undefined */
import {Button, ButtonProps, buttonVariants} from "@/app/components/ui/button"

import {cn} from "@/app/utils"
import {useActionState} from "react"
import {signOutAction} from "./auth-actions"

type SignOutButtonProps = ButtonProps

const SignOutButton = ({
  className,
  children,
  variant,
  size,
  ...props
}: SignOutButtonProps) => {
  const [state, execute] = useActionState(signOutAction, undefined)
  return (
    <form action={execute}>
      <Button
        className={cn(buttonVariants({variant, size, className}))}
        {...props}
        type="submit"
      >
        {children}
      </Button>
    </form>
  )
}

export default SignOutButton
