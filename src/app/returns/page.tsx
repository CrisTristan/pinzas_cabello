"use client"

import React from "react"

export default function ReturnsPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-rose-600">Política de Devoluciones</h1>
      <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
        <li>
          <strong>Productos dañados o defectuosos:</strong> Si recibes un producto dañado o defectuoso, tienes derecho a solicitar una devolución o cambio.
        </li>
        <li>
          <strong>Plazo para solicitar devolución:</strong> Debes notificar el problema dentro de los <span className="font-semibold text-rose-500">3 días naturales</span> posteriores a la recepción del pedido.
        </li>
        <li>
          <strong>Cómo solicitar la devolución:</strong> Envía un correo a <a href="mailto:noreply@otra.fun" className="text-blue-500 underline">noreply@otra.fun</a> incluyendo:
          <ul className="list-disc pl-6 mt-2 text-base">
            <li>Tu nombre completo y número de pedido.</li>
            <li>Descripción del daño o defecto.</li>
            <li>Imágenes claras del producto dañado o defectuoso.</li>
          </ul>
        </li>
        <li>
          <strong>Revisión y aprobación:</strong> Nuestro equipo revisará tu caso y te notificará si la devolución es aprobada o rechazada en un plazo máximo de 48 horas.
        </li>
        <li>
          <strong>Condiciones:</strong> El producto debe estar sin uso y en su empaque original. No se aceptan devoluciones por mal uso o daño accidental.
        </li>
        <li>
          <strong>Reembolso o cambio:</strong> Si la devolución es aprobada, podrás elegir entre recibir un producto nuevo o el reembolso del monto pagado.
        </li>
      </ul>
      <p className="mt-8 text-gray-600">
        Si tienes dudas adicionales sobre devoluciones, contáctanos por correo o revisa nuestras <a href="/shipping" className="text-blue-500 underline">reglas de envío</a>.
      </p>
    </div>
  )
}
