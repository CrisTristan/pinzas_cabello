"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, Heart, ShoppingBag, Truck, Shield, Award, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import logoOtra from "../../public/images/logo_otra.jpg"

export const LandingPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Mobile Header */}
      <header className="px-4 h-20 flex items-center justify-between border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center">
          {/* <Sparkles className="h-7 w-7 text-rose-500" />
          <span className="ml-2 text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
            BellaPin
          </span> */}
          <Image
            src={logoOtra}
            width={500}
            height={500}
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
                href="#productos"
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
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Mobile Hero Section */}
        <section className="w-full py-8 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 opacity-60" />
          <div className="relative text-center space-y-6">
            {/* Hero Image */}
            <div className="relative mx-auto w-64 h-64 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <Image
                src="https://www.okchicas.com/wp-content/uploads/2021/04/maneras-de-usar-y-combinar-diferentes-pinzas-para-el-cabello-2-613x700.png"
                width={256}
                height={256}
                alt="Pinzas elegantes para cabello"
                className="relative rounded-2xl shadow-xl w-full h-full object-cover"
              />
            </div>

            {/* Hero Content */}
            <div className="space-y-4">
              <Badge className="bg-rose-100 text-rose-700 text-sm px-3 py-1">✨ Colección Premium 2024</Badge>

              <h1 className="text-2xl font-bold leading-tight bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent px-2">
                Pinzas de Cabello que Transforman tu Estilo
              </h1>

              <p className="text-gray-600 text-base leading-relaxed px-4">
                Descubre nuestra exclusiva colección de pinzas para el cabello. Diseños únicos, calidad premium y el
                toque perfecto para cada ocasión especial.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 px-4 pt-2">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-base py-3"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Comprar Ahora
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 text-base py-3 bg-transparent"
                >
                  Ver Catálogo Completo
                </Button>
              </div>

              {/* Reviews */}
              <div className="flex flex-col items-center gap-2 pt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.9/5 (2,847 reseñas)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Products Section */}
        <section id="productos" className="w-full py-12 px-4 bg-white">
          <div className="text-center space-y-4 mb-8">
            <Badge className="bg-pink-100 text-pink-700">Productos Destacados</Badge>
            <h2 className="text-2xl font-bold">Nuestra Colección Premium</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cada pinza está cuidadosamente diseñada para combinar funcionalidad y elegancia.
            </p>
          </div>

          <div className="space-y-6">
            {/* Product Card 1 */}
            <Card className="border-rose-100 shadow-sm">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src="https://tse1.mm.bing.net/th/id/OIP.XDF25quZDwCNacHMXo8eOAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                    width={300}
                    height={200}
                    alt="Pinzas Clásicas Elegantes"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-rose-500 text-white text-xs">Bestseller</Badge>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Colección Clásica</h3>
                  <p className="text-gray-600 text-sm">
                    Pinzas atemporales con acabados en oro rosa y detalles de perlas.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-rose-600">$24.99</span>
                    <Button className="bg-rose-500 hover:bg-rose-600 px-6">Agregar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Card 2 */}
            <Card className="border-rose-100 shadow-sm">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src="https://image.hm.com/assets/hm/de/9d/de9dca7eb2f60a59ea786849334a0b2a000ffb56.jpg?imwidth=1260"
                    width={300}
                    height={200}
                    alt="Pinzas Modernas con Cristales"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-pink-500 text-white text-xs">Nuevo</Badge>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Colección Cristal</h3>
                  <p className="text-gray-600 text-sm">
                    Diseños modernos con cristales Swarovski y acabados brillantes.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-rose-600">$39.99</span>
                    <Button className="bg-rose-500 hover:bg-rose-600 px-6">Agregar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Card 3 */}
            <Card className="border-rose-100 shadow-sm">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src="https://image.hm.com/assets/hm/f6/eb/f6eb4666bd5bf617cfcd2ce0f8788c2b6b9529f6.jpg?imwidth=1260"
                    width={300}
                    height={200}
                    alt="Pinzas Vintage Artesanales"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-amber-500 text-white text-xs">Limitada</Badge>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Colección Vintage</h3>
                  <p className="text-gray-600 text-sm">
                    Piezas únicas inspiradas en la elegancia vintage con detalles artesanales.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-rose-600">$49.99</span>
                    <Button className="bg-rose-500 hover:bg-rose-600 px-6">Agregar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mobile Benefits Section */}
        <section id="beneficios" className="w-full py-12 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="text-center space-y-4 mb-8">
            <Badge className="bg-rose-100 text-rose-700">¿Por qué elegirnos?</Badge>
            <h2 className="text-2xl font-bold">Calidad que Marca la Diferencia</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nos especializamos exclusivamente en pinzas para el cabello, garantizando la más alta calidad.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 flex-shrink-0">
                <Award className="h-6 w-6 text-rose-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Materiales Premium</h3>
                <p className="text-gray-600 text-sm">
                  Utilizamos solo los mejores materiales: metales nobles, cristales auténticos y acabados duraderos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 flex-shrink-0">
                <Heart className="h-6 w-6 text-rose-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Diseño Exclusivo</h3>
                <p className="text-gray-600 text-sm">
                  Cada pieza es diseñada por nuestro equipo de expertos en moda y belleza.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 flex-shrink-0">
                <Shield className="h-6 w-6 text-rose-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Garantía de Satisfacción</h3>
                <p className="text-gray-600 text-sm">
                  30 días de garantía completa. Si no estás satisfecha, te devolvemos tu dinero.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Testimonials */}
        <section id="testimonios" className="w-full py-12 px-4 bg-white">
          <div className="text-center space-y-4 mb-8">
            <Badge className="bg-pink-100 text-pink-700">Testimonios</Badge>
            <h2 className="text-2xl font-bold">Lo que Dicen Nuestras Clientas</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Miles de mujeres ya han transformado su estilo con nuestras pinzas exclusivas.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-rose-100">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  "Las pinzas más hermosas que he tenido. La calidad es excepcional y recibo cumplidos cada vez que las
                  uso."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">María González</p>
                    <p className="text-xs text-gray-500">Influencer de Moda</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  "Perfectas para mi boda. El diseño vintage era exactamente lo que buscaba. El servicio al cliente
                  también fue excepcional."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Ana Martínez</p>
                    <p className="text-xs text-gray-500">Novia Feliz</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-100">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  "Como estilista profesional, puedo decir que estas pinzas son de la más alta calidad. Mis clientas
                  siempre preguntan dónde pueden conseguirlas."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Carmen López</p>
                    <p className="text-xs text-gray-500">Estilista Profesional</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mobile Services */}
        <section className="w-full py-12 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="space-y-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mx-auto mb-4">
                <Truck className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Envío Gratuito</h3>
              <p className="text-gray-600 text-sm">
                Envío gratuito en pedidos superiores a $50. Entrega rápida y segura a todo el estado.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mx-auto mb-4">
                <Shield className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Compra Segura</h3>
              <p className="text-gray-600 text-sm">
                Pagos 100% seguros con encriptación SSL. Aceptamos todas las tarjetas principales.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mx-auto mb-4">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Atención Personalizada</h3>
              <p className="text-gray-600 text-sm">
                Nuestro equipo está aquí para ayudarte a encontrar la pinza perfecta para ti.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile CTA */}
        <section id="contacto" className="w-full py-12 px-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold leading-tight">¿Lista para Transformar tu Estilo?</h2>
              <p className="text-rose-100 text-sm leading-relaxed">
                Únete a miles de mujeres que ya han descubierto la diferencia de nuestras pinzas exclusivas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Tu email para ofertas exclusivas"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-rose-200 h-12"
                />
                <Button className="w-full bg-white text-rose-600 hover:bg-rose-50 h-12 text-base font-semibold">
                  Suscribirse y Obtener 15% OFF
                </Button>
              </div>

              <p className="text-xs text-rose-200 leading-relaxed">
                Recibe un 15% de descuento en tu primera compra y ofertas exclusivas.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button size="lg" className="w-full bg-white text-rose-600 hover:bg-rose-50 h-12 text-base font-semibold">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explorar Catálogo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white text-white hover:bg-white/10 bg-transparent h-12 text-base"
              >
                Contactar Asesor
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Footer */}
      <footer className="py-8 px-4 border-t bg-white">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              BellaPin
            </span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            © 2024 BellaPin. Todos los derechos reservados.
            <br />
            Diseñado con amor para mujeres elegantes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/terms" className="text-xs text-gray-500 hover:text-rose-500">
              Términos
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-rose-500">
              Privacidad
            </Link>
            <Link href="/shipping" className="text-xs text-gray-500 hover:text-rose-500">
              Envíos
            </Link>
            <Link href="/returns" className="text-xs text-gray-500 hover:text-rose-500">
              Devoluciones
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
