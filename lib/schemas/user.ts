import z from "zod"

export const authUserSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
})

export type AuthUser = z.infer<typeof authUserSchema>

export type User = {
  username: string
}

export type Token = {
  accessToken: string
}
