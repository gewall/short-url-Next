"use client"

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useActionState, useEffect } from "react"
import { createLink } from "../../_actions/item.action"

import { CreateLink } from "@/lib/schemas/link"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ActionStateForm } from "@/lib/schemas/action"
import { toast } from "sonner"
import { useUserStore } from "@/lib/store/user"

export default function AddLink() {
  const { user } = useUserStore()
  const [state, action, isPending] = useActionState(createLink, {
    payload: null,
    success: false,
  } as ActionStateForm<CreateLink>)

  useEffect(() => {
    if (state.success) {
      toast.success("Link created successfully", {
        position: "top-center",
      })
      if (!state.success && state.message) {
        toast.error("link create failed", {
          position: "top-center",
          description: state.message,
        })
      }
    }
  }, [state])
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle aria-label="create form title">Add Link</DialogTitle>
        <DialogDescription>
          This form will create a new link for you.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form action={action} id="create-link">
        <FieldGroup>
          <Field>
            <FieldLabel>URL</FieldLabel>
            <Input
              type="text"
              name="originalUrl"
              placeholder="Input your Url"
              defaultValue={state.payload?.originalUrl ?? ""}
            />
            <input type="hidden" name="token" value={user.accessToken} />
            {state.error?.fieldErrors?.originalUrl && (
              <FieldError
                errors={state.error?.fieldErrors?.originalUrl.map((e) => ({
                  message: e,
                }))}
              />
            )}
          </Field>
          <Field>
            <FieldLabel>Short URL</FieldLabel>
            <Input
              type="text"
              name="shortCode"
              placeholder="Input your short Url"
              defaultValue={state.payload?.shortCode ?? ""}
            />
            {state.error?.fieldErrors?.shortCode && (
              <FieldError
                errors={state.error?.fieldErrors?.shortCode.map((e) => ({
                  message: e,
                }))}
              />
            )}
          </Field>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              type="text"
              name="title"
              placeholder="Input your title"
              defaultValue={state.payload?.title ?? ""}
            />
            {state.error?.fieldErrors?.title && (
              <FieldError
                errors={state.error?.fieldErrors?.title.map((e) => ({
                  message: e,
                }))}
              />
            )}
          </Field>
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button type="submit" form="create-link" disabled={isPending}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
