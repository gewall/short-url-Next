"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Eye, EyeClosed, User2 } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { register } from "../../_actions/auth.action"
import { AuthUser, Token } from "@/lib/schemas/user"
import { ActionStateForm } from "@/lib/schemas/action"
import { toast } from "sonner"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [state, action, isPending] = useActionState(register, {
    payload: null,
    success: false,
    error: undefined,
    message: undefined,
  } as ActionStateForm<AuthUser & Token>)

  useEffect(() => {
    if (state.success) {
      toast.success("Registration successful", {
        position: "top-center",
      })
    }
    if (!state.success && state.message) {
      toast.error("Registration failed", {
        position: "top-center",
        description: state.message,
      })
    }
  }, [state])

  return (
    <div className="flex flex-col gap-4 px-8">
      <form action={action} id="form-register">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <InputGroup className="rounded-sm">
              <InputGroupInput
                placeholder="Enter your username"
                type="text"
                name="username"
                id="username"
              />
              <InputGroupAddon align="inline-end">
                <User2 />
              </InputGroupAddon>
            </InputGroup>
            {state.error?.fieldErrors?.username && (
              <FieldError
                errors={state.error?.fieldErrors?.username.map((e) => ({
                  message: e,
                }))}
              />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup className="rounded-sm">
              <InputGroupInput
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {state.error?.fieldErrors?.password && (
              <FieldError
                errors={state.error?.fieldErrors?.password.map((e) => ({
                  message: e,
                }))}
              />
            )}
          </Field>
        </FieldGroup>
      </form>
      <Button form="form-register" type="submit" disabled={isPending}>
        Register
      </Button>
    </div>
  )
}
