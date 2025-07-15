"use client"
import { Home, Inbox, Settings, Package, ShoppingCart, Truck, Users, BarChart3 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Órdenes",
    url: "/admin/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Entregas",
    url: "/admin/dashboard/deliveries",
    icon: Truck,
  },
  {
    title: "Productos",
    url: "/admin/dashboard/products",
    icon: Package,
  },
  // {
  //   title: "Clientes",
  //   url: "/admin/dashboard/customers",
  //   icon: Users,
  // },
  // {
  //   title: "Reportes",
  //   url: "/admin/dashboard/reports",
  //   icon: BarChart3,
  // },
]

const settingsItems = [
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
  },
  // {
  //   title: "Soporte",
  //   url: "/support",
  //   icon: Inbox,
  // },
]



export function AppSidebar({isLoggedIn}: { isLoggedIn?: boolean}) {
  
  return (
    <Sidebar className="w-64">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <Package className="h-6 w-6" />
          <span className="font-semibold text-lg">Mi Tienda ¿Otra?</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                {isLoggedIn && <LogoutLink className="w-full bg-blue-500 p-3 rounded-md mt-4">Salir</LogoutLink>}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent> */}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-4 py-2 text-sm text-muted-foreground">© ¿Otra? Tienda Online</div>
      </SidebarFooter>
    </Sidebar>
  )
}
