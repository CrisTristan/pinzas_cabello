"use client"

import React, { useState, useRef, useEffect, startTransition } from 'react'
import { useRouter } from 'next/navigation';

export const OrderActionsButton = ({ idOrder }: { idOrder: string }) => {
  const [showOrderActions, setShowOrderActions] = useState(false);
  const router = useRouter();

  // Referencia al div que contiene las acciones
  const accionesRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accionesRef.current &&
        !accionesRef.current.contains(event.target as Node)
      ) {
        setShowOrderActions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleOrderAction = (id: string, status: string) => {
    fetch('/api/orders', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        status,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar la orden');
        return res.json();
      })
      .then(data => {
        console.log('Orden actualizada:', data);
        window.location.reload();
      })
      .catch(err => {
        console.error('Error:', err.message);
      });
  };

  return (
    <div ref={accionesRef}>
      <div onClick={() => setShowOrderActions(prev => !prev)} className="bg-peach p-2 rounded-md cursor-pointer">
        Acciones
      </div>

      {showOrderActions && (
        <div className="flex flex-col gap-3 mt-2 bg-white shadow-md p-2 rounded-md">
          <p>Marcar como:</p>
          <button
            onClick={() => handleOrderAction(idOrder, 'Entregado')}
            className="bg-green-300 p-2 rounded-md"
          >
            Entregado
          </button>
          <button
            onClick={() => handleOrderAction(idOrder, 'Cancelado')}
            className="bg-red-300 p-2 rounded-md"
          >
            Cancelado
          </button>
          <button
            onClick={() => handleOrderAction(idOrder, 'Por entregar')}
            className="bg-gray-200 p-2 rounded-md"
          >
            Por entregar
          </button>
        </div>
      )}
    </div>
  );
};
