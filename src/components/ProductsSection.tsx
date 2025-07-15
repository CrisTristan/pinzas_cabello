"use client"

import { LandingPage } from "@/components/landingPage"
import Image from "next/image"
import { ProductCard } from "../components/ProductCard"
import React, { useEffect, useState } from "react"
import { Product } from "@/types/product"

export const ProductsSection = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{//TODO
    fetch("/api/products")
    .then(res => res.json())
    .then(data => {
      // console.log("Productos cargados:", data);
      setProducts(data);
    })

  }, []);

  useEffect(() => {
    // Leer el carrito del localStorage al cargar la página
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    // Escuchar cambios en el localStorage (por si se añade desde otro tab)
    const handleStorage = () => {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Actualizar el carrito cuando se añade un producto
  useEffect(() => {
    const interval = setInterval(() => {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const updateCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleIncrease = (id: string, type: string) => {
    const newCart = cart.map(item =>
      item._id === id && item.type === type
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCart(newCart);
  };

  const handleDecrease = (id: string, type: string) => {
    let newCart = cart
      .map(item =>
        item._id === id && item.type === type
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter(item => (item.quantity && item.quantity > 0)); // Solo deja productos con cantidad > 0
    updateCart(newCart);
  };

  return (
    <div>
      <div className="flex justify-between items-center m-5">
        <h1>Productos</h1>
        <button
          className="relative bg-peach-primary rounded-full p-3"
          onClick={() => setShowCart(!showCart)}
          aria-label="Ver carrito"
        >
          {/* Icono de carrito simple */}
          <span role="img" aria-label="carrito" style={{fontSize: 24}}>🛒</span>
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
              {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
            </span>
          )}
        </button>
      </div>
      {showCart && (
        <div className="bg-white border rounded shadow p-4 m-5 max-w-md">
          <h2 className="font-bold mb-2">Carrito de compras</h2>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li key={item._id+item.type} className="flex justify-between items-center border-b py-2">
                  <span>{item.name} x <span className="text-red-500 font-bold">{item.quantity || 1}</span></span>
                  <span className="text-red-500 font-bold">{item.type === 'D' ? 'Docena': 'Individual'}</span> {/*SelectedOption */}
                  <span>${item.price * (item.quantity || 1)}</span>
                  <button
                    className="bg-gray-200 text-green-300 font-bold p-2"
                    onClick={() => handleIncrease(item._id, item.type)}
                  >+</button>
                  <button
                    className="bg-gray-200 text-red-300 font-bold p-2"
                    onClick={() => handleDecrease(item._id, item.type)}
                  >-</button>
                </li>
              ))}
            </ul>
          )}
          <p>
            Total: <span className="font-bold">
              ${cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)}
            </span>
          </p>
          <div className="m-3 flex justify-center items-center">
            {cart.length > 0 &&  <button
              className="bg-peach-primary rounded p-2"
              onClick={() => {
                if(cart.length === 0) {
                  alert("El carrito está vacío");
                  return;
                }
                const params = new URLSearchParams({
                  cart: JSON.stringify(cart)
                });
                window.location.href = `http://localhost:3000/checkout?${params.toString()}`;
              }}
            >
              Ir a Pagar
            </button>}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-10 m-5">
        {products.map((product, i) => (
        <ProductCard
          key= {product._id}
          _id={product._id}
          name={product.name}
          individualPrice={product.individualPrice}
          docenaPrice={product.docenaPrice}
          image={product.image}
        />
      ))}
      </div>
    </div>
  )
}
