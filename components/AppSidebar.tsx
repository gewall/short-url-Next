import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { Home } from "lucide-react"

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex w-full items-center justify-center gap-1 px-4 py-8 text-center">
          <h5 className="rounded-sm bg-linear-to-bl from-cyan-300/50 to-cyan-600/50 px-2 py-0 text-2xl">
            S
          </h5>
          <h5 className="text-lg">Shortle</h5>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
