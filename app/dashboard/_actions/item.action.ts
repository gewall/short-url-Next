import { error } from "@/lib/errors"
import { ActionState, ActionStateForm } from "@/lib/schemas/action"
import {
  CreateLink,
  CreateLinkSchema,
  Link,
  UpdateLink,
  UpdateLinkSchema,
} from "@/lib/schemas/link"
import { addDays } from "date-fns"
import z from "zod"

export async function getLinks(
  accessToken: string
): Promise<ActionState<Link[]>> {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (req.status === 401) {
    return {
      payload: null,
      success: false,
      error: "Unauthorized",
    }
  }
  if (!req.ok) {
    throw error.fetchError
  }
  const res = await req.json()
  const data = res.data.map(
    (link: {
      id: string
      original_url: string
      short_code: string
      title: string
      is_active: boolean
      expires_at: string
    }) => ({
      id: link.id,
      originalUrl: link.original_url,
      shortCode: link.short_code,
      title: link.title,
      isActive: link.is_active,
      expiresAt: new Date(link.expires_at),
    })
  )

  return {
    payload: data,
    success: true,
    error: null,
  }
}

export async function getLinkById(
  id: string,
  token: string
): Promise<ActionState<Link>> {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/links/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!req.ok) {
    throw error.fetchError
  }
  const res = await req.json()

  return {
    payload: {
      id: res.data.id,
      originalUrl: res.data.original_url,
      shortCode: res.data.short_code,
      title: res.data.title,
      isActive: res.data.is_active,
      expiresAt: new Date(res.data.expires_at),
    } as Link,
    success: true,
    error: null,
  }
}

export async function createLink(
  prevState: ActionStateForm<CreateLink>,
  formData: FormData
): Promise<ActionStateForm<CreateLink>> {
  const validateField = CreateLinkSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  const value: CreateLink = Object.fromEntries(formData.entries()) as CreateLink
  const token = formData.get("token") as string

  if (!validateField.success) {
    return {
      payload: value,
      success: false,
      error: z.flattenError(validateField.error),
    }
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      original_url: value.originalUrl,
      title: value.title,
      short_code: value.shortCode,
      expires_at: addDays(new Date(), 30).toISOString(),
    }),
  })
  if (!req.ok) {
    throw error.fetchError
  }
  // const res = await req.json()

  return {
    payload: value,
    success: true,
    message: "Link created successfully",
  }
}

export async function updateLink(
  prevState: ActionStateForm<UpdateLink>,
  formData: FormData
): Promise<ActionStateForm<UpdateLink>> {
  const value: UpdateLink = {
    id: formData.get("id") as string,
    isActive: formData.get("isActive") === "true",
    title: formData.get("title") as string,
  }

  const validateField = UpdateLinkSchema.safeParse(value)
  const token = formData.get("token") as string
  if (!validateField.success) {
    return {
      payload: value,
      success: false,
      error: z.flattenError(validateField.error),
    }
  }

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/links/${value.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title: value.title,
        is_active: value.isActive.toString(),
      }),
    }
  )
  if (!req.ok) {
    throw error.fetchError
  }

  return {
    payload: value,
    success: true,
    message: "Link updated successfully",
  }
}

export async function deleteLink(id: string, token: string) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/links/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!req.ok) {
    throw error.fetchError
  }

  return {
    payload: null,
    success: true,
    error: null,
  }
}
