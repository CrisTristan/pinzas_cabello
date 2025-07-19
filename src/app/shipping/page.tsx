"use client"

import React from "react"

export default function ShippingPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-rose-600">Reglas y Condiciones de Envío</h1>
      <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
        <li>
          <strong>Plazo de entrega:</strong> Todos los pedidos se entregan en un plazo de <span className="font-semibold text-rose-500">12 a 72 horas</span> después de realizar la compra.
        </li>
        <li>
          <strong>Zona de cobertura:</strong> Actualmente solo realizamos envíos dentro de la ciudad de <span className="font-semibold text-rose-500">Cancún</span>.
        </li>
        <li>
          <strong>Horario de entrega:</strong> Las entregas se realizan de lunes a sábado entre las 9:00 am y 8:00 pm.
        </li>
        <li>
          <strong>Costo de envío:</strong> El costo fijo de envío es de <span className="font-semibold">$50 MXN</span> por pedido.
        </li>
        <li>
          <strong>Seguimiento:</strong> Recibirás una notificación por WhatsApp o llamada cuando tu pedido esté en camino.
        </li>
        <li>
          <strong>Dirección:</strong> Por favor, asegúrate de ingresar correctamente tu dirección y número de contacto para evitar retrasos.
        </li>
        <li>
          <strong>Reprogramación:</strong> Si no puedes recibir tu pedido en el horario estimado, contáctanos para reprogramar la entrega sin costo adicional.
        </li>
        {/* <li>
          <strong>Devoluciones:</strong> Si tienes algún problema con tu pedido, revisa nuestra sección de <a href="/returns" className="text-blue-500 underline">devoluciones</a>.
        </li> */}
      </ul>
      <p className="mt-8 text-gray-600">
        Si tienes dudas adicionales sobre el envío, puedes contactarnos a través de WhatsApp o nuestro formulario de contacto.
      </p>
    </div>
  )
}
