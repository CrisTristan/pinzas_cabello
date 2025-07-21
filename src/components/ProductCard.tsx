"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'

export const ProductCard = ({
  _id,
  name,
  individualPrice,
  docenaPrice,
  image,
  stockDocena,
  stockIndividual,
  onAddToCart,
}: Product & { onAddToCart?: (product: Product, selectedOption: string) => void }): React.JSX.Element => {

  const [selectedOption, setSelectedOption] = useState('D');

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
    const existingIndex = cart.findIndex((item: Product) => item._id === product._id && item.type === selectedOption);
    if (existingIndex !== -1) {
      // Si ya existe, incrementar cantidad
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      // Si no existe, agregar con cantidad 1
      cart.push({ ...product, quantity: 1, price: selectedOption === 'D' ? docenaPrice : individualPrice });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idProduct: number) => {
    if(e.target.value === 'Docena'){
      setSelectedOption("D");
    }else{
      setSelectedOption("I");
    }
    
    console.log('Seleccionado:', e.target.value, 'ID del producto:', idProduct);
  };

  return (
    <div className="bg-peach text-center p-4 rounded-md flex flex-col items-center gap-2">
      <h2 className="font-bold text-lg text-pink-500">{name}</h2>
      {/* <p>{_id}</p> */}
      <div>
        <label className="mr-4">
          <input
            type="radio"
            name={`options-${_id}`}
            value="Docena"
            checked={selectedOption === 'D'}
            onChange={(e)=> handleChange(e, _id)}
          />
          <span className="ml-2 text-orange-400 font-bold">Docena</span>
        </label>

        <label>
          <input
            type="radio"
            name={`options-${_id}`}
            value="Individual"
            checked={selectedOption === 'I'}
            onChange={(e)=> handleChange(e, _id)}
          />
          <span className="ml-2 text-orange-500 font-bold">Individual</span>
        </label>
      </div>
      <Image
        src={image}
        width={400}
        height={400}
        alt="producto"
      />
      {
        selectedOption === 'D' ? (
          <p className='text-red-500 text-xl'>
            {(stockDocena ?? 0) === 0
              ? "agotado"
              : (stockDocena ?? 0) <= 5
                ? "Casi agotado"
                : ""}
          </p>
        ) : (
          <p className='text-red-500 text-xl'>
            {(stockIndividual ?? 0) === 0
              ? "agotado"
              : (stockIndividual ?? 0) <= 5
                ? "Casi agotado"
                : ""}
          </p>
        )
      }
      
      <p className="text-xl font-bold text-peach-secondary">${selectedOption ==='D' ? docenaPrice: individualPrice}</p>
      <div className="flex gap-3">
        <button
          className={`bg-peach-primary rounded p-2 text-md transition-opacity ${
            ((selectedOption === 'D' && (stockDocena ?? 0) === 0) ||
              (selectedOption === 'I' && (stockIndividual ?? 0) === 0))
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() => {
            if (onAddToCart) onAddToCart({ _id, name, individualPrice, docenaPrice, image, stockDocena, stockIndividual }, selectedOption);
          }}
          disabled={
            (selectedOption === 'D' && (stockDocena ?? 0) === 0) ||
            (selectedOption === 'I' && (stockIndividual ?? 0) === 0)
          }
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
