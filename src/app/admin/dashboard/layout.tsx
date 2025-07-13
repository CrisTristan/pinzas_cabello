
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard - Mi Tienda Online",
  description: "Panel de administración para gestionar tu tienda en línea",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Administrador</span>
            </div>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}