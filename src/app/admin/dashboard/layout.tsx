
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard - Mi Tienda Online",
  description: "Panel de administración para gestionar tu tienda en línea",
  icons: {
    icon: [
      { url: '/favicon.ico', href: '/favicon.ico' },
    ],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const {isAuthenticated, getUser, getRoles} = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = isLoggedIn ? await getUser() : null;

  const roles = isLoggedIn ? await getRoles() : [];
  console.log("User roles:", roles);
  if (
    !(roles?.[0]?.key === ("admin_user"))
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Acceso Denegado</h1>
      </div>
    )
  }
  
  return (
    <SidebarProvider>
      <AppSidebar
        isLoggedIn={isLoggedIn ?? undefined}
      />
      <main className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Administrador: {user?.given_name+" "+user?.family_name}</span>
            </div>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}