import { ActionStateForm } from "@/lib/schemas/action"
import { AuthUser, authUserSchema, Token } from "@/lib/schemas/user"
import { redirect } from "next/navigation"

import z from "zod"

export async function login(
  prevState: ActionStateForm<AuthUser>,
  formData: FormData
): Promise<ActionStateForm<AuthUser & Token>> {
  const validateField = authUserSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validateField.success) {
    return {
      payload: null,
      success: false,
      error: z.flattenError(validateField.error),
      message: "Invalid credentials",
    }
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/signin`, {
    method: "POST",
    body: JSON.stringify(validateField.data),
    credentials: "include",
  })

  if (!req.ok) {
    return {
      payload: null,
      success: false,
      message: "login failed",
    }
  }

  const data = await req.json()

  return {
    payload: {
      username: validateField.data?.username || "",
      password: "",
      accessToken: data.data?.access_token,
    },
    success: true,
    message: "Login successful",
  }
}

export async function register(
  prevState: ActionStateForm<AuthUser>,
  formData: FormData
): Promise<ActionStateForm<AuthUser & Token>> {
  const validateField = authUserSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validateField.success) {
    return {
      payload: null,
      success: false,
      error: z.flattenError(validateField.error),
      message: "Invalid credentials",
    }
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/signup`, {
    method: "POST",
    body: JSON.stringify(validateField.data),
  })

  if (!req.ok) {
    return {
      payload: null,
      success: false,
      message: "Registration failed",
    }
  }

  redirect("/login")

  return {
    payload: null,
    success: true,
    message: "Registration successful",
  }
}

export async function refreshToken() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/refresh-token`,
    {
      method: "POST",
      body: JSON.stringify({}),
      credentials: "include",
    }
  )
  if (!req.ok) {
    return {
      accessToken: null,
      success: false,
      message: "Refresh token failed",
    }
  }
  const res = await req.json()
  return { accessToken: res.data?.access_token }
}

export async function logout() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/signout`, {
    method: "POST",
    body: JSON.stringify({}),
    credentials: "include",
  })
  if (!req.ok) {
    return {
      accessToken: null,
      success: false,
      message: "Sign out failed",
    }
  }

  redirect("/login")
  return { accessToken: null, success: true, message: "Sign out successful" }
}
