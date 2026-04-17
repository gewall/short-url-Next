import z from "zod"

export type ActionState<T> = {
  payload: T | null
  success: boolean
  error: string | null
}

export type ActionStateForm<T> = {
  payload: T | null
  success: boolean
  error?: z.ZodFlattenedError<T>
  message?: string
}
