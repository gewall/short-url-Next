"use client"

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useActionState, useEffect } from "react"
import { updateLink } from "../../_actions/item.action"
import { ActionStateForm } from "@/lib/schemas/action"
import { UpdateLink } from "@/lib/schemas/link"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useUserStore } from "@/lib/store/user"

interface EditLinkProps {
  id: string
  title: string
  isActive: boolean
}

export default function EditLink({ id, title, isActive }: EditLinkProps) {
  const { user } = useUserStore()
  const [state, action, isPending] = useActionState(updateLink, {
    payload: null,
    success: false,
  } as ActionStateForm<UpdateLink>)

  useEffect(() => {
    if (state.success) {
      toast.success("Link edited successfully", {
        position: "top-center",
      })
    }
  }, [state])
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Link</DialogTitle>
        <DialogDescription>
          This form will update the link for you.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <form action={action} id="edit-link">
        <FieldGroup>
          <Field data-disabled>
            <FieldLabel htmlFor="edit-id-form">ID</FieldLabel>
            <Input
              id="edit-id-form"
              type="text"
              disabled
              aria-label="edit link id"
              defaultValue={id}
            />
            <Input name="id" type="hidden" defaultValue={id} />
            <Input name="token" type="hidden" defaultValue={user.accessToken} />

            {state.error?.fieldErrors?.id && (
              <FieldError
                errors={state.error?.fieldErrors?.id.map((e) => ({
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
              aria-label="edit link title"
              defaultValue={state.payload?.title ?? title ?? ""}
            />
            {state.error?.fieldErrors?.title && (
              <FieldError
                errors={state.error?.fieldErrors?.title.map((e) => ({
                  message: e,
                }))}
              />
            )}
          </Field>
          <Field>
            <FieldLabel>Is Active</FieldLabel>
            <Select
              name="isActive"
              defaultValue={
                (state.payload?.isActive ?? isActive) ? "true" : "false"
              }
            >
              <SelectTrigger aria-label="edit link isActive">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {state.error?.fieldErrors?.isActive && (
              <FieldError
                errors={state.error?.fieldErrors?.isActive.map((e) => ({
                  message: e,
                }))}
              />
            )}
          </Field>
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button type="submit" form="edit-link" disabled={isPending}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
