import { useState } from "react"

export default function useCharGenerator(length: number) {
  const [code, setCode] = useState<string | null>(null)
  function generate() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCode(result)
  }

  return { generate, code }
}
