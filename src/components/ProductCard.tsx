"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'

export const ProductCard = ({ _id, name, price, image }: Product): React.JSX.Element => {

  const [selectedOption, setSelectedOption] = useState('Docena');

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

  const handleAddToCart = (product: Product) => {
    // Obtener el carrito actual o inicializarlo
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Buscar si el producto ya está en el carrito
    const existingIndex = cart.findIndex((item: Product) => item._id === product._id && item.selectedOption === selectedOption);
    if (existingIndex !== -1) {
      // Si ya existe, incrementar cantidad
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      // Si no existe, agregar con cantidad 1
      cart.push({ ...product, quantity: 1, price: selectedOption === 'Docena' ? 200 : 30});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idProduct: number) => {
    setSelectedOption(e.target.value);
    console.log('Seleccionado:', e.target.value, 'ID del producto:', idProduct);
  };

  return (
    <div
      className="bg-peach text-center p-4 rounded-md flex flex-col items-center gap-2"
    >
      <h2 className="font-bold text-md">{name}</h2>
      {/* <p>{_id}</p> */}
      <div>
        <label className="mr-4">
          <input
            type="radio"
            name={`options-${_id}`}
            value="Docena"
            checked={selectedOption === 'Docena'}
            onChange={(e)=> handleChange(e, _id)}
          />
          <span className="ml-2">Docena</span>
        </label>

        <label>
          <input
            type="radio"
            name={`options-${_id}`}
            value="Individual"
            checked={selectedOption === 'Individual'}
            onChange={(e)=> handleChange(e, _id)}
          />
          <span className="ml-2">Individual</span>
        </label>
      </div>
      <Image
        src={image}
        width={400}
        height={400}
        alt="producto"
      />
      <p className="text-xl font-bold text-peach-secondary">${selectedOption ==='Docena' ? "200": "30"}</p>
      <div className="flex gap-3">
        <button
          className="bg-peach-primary rounded p-2 text-md"
          onClick={() => handleAddToCart({ _id, name, price, image, selectedOption })}
        >
          Añadir al carrito
        </button>
        {/* <button className="bg-peach-primary rounded p-2 text-md"
          onClick={() => handlePay({ _id, name, price, image })}
        >Pagar</button> */}
      </div>

    </div>
  )
}
