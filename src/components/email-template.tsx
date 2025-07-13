import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  clientName: string;
}

export function EmailTemplate({ firstName, clientName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Hola, {firstName}!</h1>
      <p>Alguien acaba de hacer una compra en tu tienda en linea</p>
      <h2>{clientName}</h2>
      <p>Realizó una compra</p>
      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard/orders`}>
        Pulsa Aqui para ver las ordenes recientes
      </a>
    </div>
  );
}