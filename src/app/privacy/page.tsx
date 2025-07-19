"use client"

import React from "react"

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-rose-600">Aviso de Privacidad</h1>
      <p className="mb-4 text-gray-700 text-lg">
        En ¿Otra? Tienda Online, tu privacidad es muy importante para nosotros. A continuación te informamos cómo protegemos y usamos tus datos personales:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
        <li>
          <strong>Recopilación de datos:</strong> Recopilamos información como nombre, dirección, teléfono y correo electrónico únicamente para procesar tus pedidos y brindarte un mejor servicio.
        </li>
        <li>
          <strong>Uso de la información:</strong> Tus datos se utilizan exclusivamente para la gestión de compras, envíos, atención al cliente y notificaciones relacionadas con tu pedido.
        </li>
        <li>
          <strong>Protección de datos:</strong> Implementamos medidas de seguridad para proteger tu información contra accesos no autorizados.
        </li>
        <li>
          <strong>No compartimos tus datos:</strong> No vendemos ni compartimos tu información personal con terceros, salvo que sea necesario para completar tu compra (por ejemplo, empresas de mensajería).
        </li>
        <li>
          <strong>Derechos ARCO:</strong> Puedes solicitar en cualquier momento el acceso, rectificación, cancelación u oposición al uso de tus datos personales enviando un correo a <a href="mailto:noreply@otra.fun" className="text-blue-500 underline">noreply@otra.fun</a>.
        </li>
        <li>
          <strong>Cookies:</strong> Utilizamos cookies para mejorar tu experiencia de navegación. Puedes desactivarlas en la configuración de tu navegador.
        </li>
        <li>
          <strong>Cambios al aviso:</strong> Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento. Los cambios serán publicados en esta página.
        </li>
      </ul>
      <p className="mt-8 text-gray-600">
        Si tienes dudas sobre nuestro aviso de privacidad, contáctanos. El uso de este sitio implica la aceptación de este aviso.
      </p>
    </div>
  )
}
