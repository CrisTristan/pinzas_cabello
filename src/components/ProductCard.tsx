"use client"

import React from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'

export const ProductCard = ({id, name, price, image} : Product) : React.JSX.Element => {
  
    const handlePay = async (product: Product) => {
      const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })
      const session = await res.json();
      console.log(session);
      window.location = session.url; //redireccion a la url de pago
    }

  return (
    <div 
          className="bg-peach text-center p-4 rounded-md flex flex-col items-center gap-2"
        >
          <h2 className="font-bold text-md">{name}</h2>
          <Image
            src={image}
            width={50}
            height={50}
            alt="producto"
          />
          <p className="text-xl font-bold text-peach-secondary">${price}</p>
          <button className="bg-peach-primary rounded p-2 text-md"
            onClick={() => handlePay({ id, name, price, image })}
          >Pagar</button>
    </div>
  )
}
