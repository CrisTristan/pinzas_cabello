import Link from "next/link"
import React, { useState } from 'react'
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server"

export const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    return (
        <div>
            <header className="px-4 h-26 flex items-center justify-between border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
                <Link href="/" className="flex items-center">
                    {/* <Sparkles className="h-7 w-7 text-rose-500" />
                  <span className="ml-2 text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                    BellaPin
                  </span> */}
                    <Image
                        src="/images/logo_otra.jpg"
                        width={100}
                        height={100}
                        alt="logo de ¿otra?"
                    />
                </Link>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 hover:text-rose-500">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
                        <nav className="flex flex-col p-4 space-y-4">
                            <Link
                                href="/#productos"
                                className="text-base font-medium text-gray-700 hover:text-rose-500 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Productos
                            </Link>
                            <Link
                                href="#beneficios"
                                className="text-base font-medium text-gray-700 hover:text-rose-500 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Beneficios
                            </Link>
                            <Link
                                href="#testimonios"
                                className="text-base font-medium text-gray-700 hover:text-rose-500 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Testimonios
                            </Link>
                            <Link
                                href="#contacto"
                                className="text-base font-medium text-gray-700 hover:text-rose-500 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contacto
                            </Link>
                            <LoginLink className="w-auto self-start px-3 py-2 bg-blue-500 rounded-md text-white font-medium">
                                Iniciar sesión
                            </LoginLink>
                        </nav>
                    </div>
                )}
            </header>
        </div>
    )
}
