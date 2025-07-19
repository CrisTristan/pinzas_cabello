"use client"

import React from "react"

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-rose-600">Términos y Condiciones</h1>
      <ol className="list-decimal pl-6 space-y-3 text-gray-700 text-lg">
        <li>
          <strong>Uso del sitio:</strong> Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones.
        </li>
        <li>
          <strong>Productos:</strong> Todos los productos ofrecidos son nuevos y originales. Las imágenes son ilustrativas y pueden variar ligeramente del producto real.
        </li>
        <li>
          <strong>Precios:</strong> Los precios están expresados en pesos mexicanos (MXN) e incluyen IVA. Nos reservamos el derecho de modificar precios sin previo aviso.
        </li>
        <li>
          <strong>Pagos:</strong> Los pagos se procesan de forma segura a través de nuestra pasarela de pago. No almacenamos información bancaria de los clientes.
        </li>
        <li>
          <strong>Envíos:</strong> Consulta nuestras <a href="/shipping" className="text-blue-500 underline">reglas de envío</a> para conocer los plazos, costos y zonas de cobertura.
        </li>
        <li>
          <strong>Devoluciones:</strong> Consulta nuestra <a href="/returns" className="text-blue-500 underline">política de devoluciones</a> para conocer los requisitos y procedimientos.
        </li>
        <li>
          <strong>Privacidad:</strong> Tu información personal será tratada de acuerdo a nuestro aviso de privacidad y no será compartida con terceros sin tu consentimiento.
        </li>
        <li>
          <strong>Responsabilidad:</strong> No nos hacemos responsables por retrasos en la entrega causados por factores externos (clima, eventos fortuitos, etc.).
        </li>
        <li>
          <strong>Propiedad intelectual:</strong> Todos los contenidos, imágenes y diseños son propiedad de ¿Otra? Tienda Online y no pueden ser utilizados sin autorización.
        </li>
        <li>
          <strong>Contacto:</strong> Para cualquier duda o aclaración, puedes escribirnos a <a href="mailto:noreply@otra.fun" className="text-blue-500 underline">noreply@otra.fun</a>.
        </li>
      </ol>
      <p className="mt-8 text-gray-600">
        El uso de este sitio implica la aceptación de estos términos y condiciones. Nos reservamos el derecho de modificarlos en cualquier momento.
      </p>
    </div>
  )
}
