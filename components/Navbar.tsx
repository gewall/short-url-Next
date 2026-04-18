"use client"

import { Search } from "lucide-react"
import Logo from "./Logo"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useUserStore } from "@/lib/store/user"
import { useEffect } from "react"
import { getLinks } from "@/app/dashboard/_actions/item.action"
import { logout, refreshToken } from "@/app/(auth)/_actions/auth.action"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Navbar() {
  const { user, updateToken } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (user.accessToken === "") return
    if (user.username === "") router.push("/login")
    ;(async () => {
      const req = await getLinks(user.accessToken)
      if (!req.success) {
        const token = await refreshToken()
        updateToken(token.accessToken)
        if (!token.success) {
          router.push("/login")
        }
      }
    })()

    return () => {}
  }, [updateToken, user.accessToken, router])

  return (
    <nav
      aria-label="main-nav"
      className="flex flex-col items-center justify-center px-8 md:px-16 lg:px-32"
    >
      <div className="flex w-full items-center">
        <div>
          <Logo />
        </div>
        <div className="ml-auto flex space-x-4">
          <InputGroup className="hidden md:flex">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <DropdownMenu>
            <DropdownMenuTrigger asChild aria-label="User menu">
              <Button variant={"ghost"} size={"icon"} className="rounded-full">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {user?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  toast.error("Not yet implemented", { position: "top-center" })
                }
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full md:hidden">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </nav>
  )
}
