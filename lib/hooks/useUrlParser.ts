import { usePathname } from "next/navigation"

export function useUrlParser() {
  const path = usePathname()
  function isActive(matcher: string, exact = false) {
    return exact ? path === matcher : path?.startsWith(matcher + "/")
  }

  return {
    isActive,
  }
}
