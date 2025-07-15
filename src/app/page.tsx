"use client"

import { ProductsSection } from "@/components/ProductsSection"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { LandingPage } from "@/components/landingPage"
import { NavBar } from "@/components/NavBar"

export default function Home() {
  return (
    <div>
      {/* <LoginLink className="mt-4 bg-blue-500 p-3 rounded-md">Iniciar sesión</LoginLink> */}
      <NavBar/>
      <LandingPage />
      {/* <ProductsSection /> */}
    </div>
  )
}
