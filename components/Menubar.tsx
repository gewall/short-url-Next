"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu"
import Container from "./Container"

import { useUrlParser } from "@/lib/hooks/useUrlParser"

type MenubarProps = {
  Action?: React.ReactNode
}

const menuItems = [
  { label: "Links", href: "/dashboard", id: "dashboard" },
  { label: "Analytics", href: "/dashboard/analytics", id: "analytics" },
]

export default function Menubar({ Action }: MenubarProps) {
  const { isActive } = useUrlParser()
  return (
    <Container className="flex items-center space-x-4">
      <NavigationMenu className="rounded-md border-2 bg-neutral-100">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem
              asChild
              key={item.id}
              className={
                isActive(item.href, item.id === "dashboard" && true)
                  ? "border-b-2 border-b-cyan-600 p-2 text-cyan-600"
                  : "border-b-2 border-b-neutral-600 p-2"
              }
            >
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {Action}
    </Container>
  )
}
