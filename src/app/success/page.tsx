"use client";

import React, { useEffect } from 'react'

export default function SuccessPage() : React.JSX.Element {

  useEffect(() => {
    // Limpiar el carrito al completar la compra
    localStorage.removeItem('cart');
  }, []);

  return (
    <div
      className='text-3xl font-bold text-center py-10 h-screen flex items-center justify-center'
    >
      <div>
      <span className='text-7xl'>🎉</span>
      <h1>Exito</h1>
      <p>Gracias Por tu compra</p>
      <p>En Un plazo de 12 a 72 horas tu pedido estara llegando a las puertas de tu casa</p>
      <p>Te contactaremos por Whatsapp o por Telefono cuando tu pedido este llegando a tu domicilio</p>
      <a href='/' className='text-blue-500 block mt-4'>
       Volver a la tienda
      </a>
      </div>
    </div>
  )
}
