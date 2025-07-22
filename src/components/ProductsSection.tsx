"use client"

import { LandingPage } from "@/components/landingPage"
import Image from "next/image"
import { ProductCard } from "../components/ProductCard"
import React, { useEffect, useState } from "react"
import { Product } from "@/types/product"

export const ProductsSection = ({ onShowCart }: { onShowCart?: () => void }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Guardar el stock inicial para no exceder el máximo
  const [initialStocks, setInitialStocks] = useState<Record<string, { stockDocena: number, stockIndividual: number }>>({});

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        // Guardar el stock inicial de cada producto
        const stocks: Record<string, { stockDocena: number, stockIndividual: number }> = {};
        data.forEach((p: Product) => {
          stocks[p._id] = {
            stockDocena: p.stockDocena ?? 0,
            stockIndividual: p.stockIndividual ?? 0,
          };
        });
        setInitialStocks(stocks);

        // Ajustar el stock según el carrito después de cargar productos y stocks
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (storedCart.length > 0) {
          setProducts(prev =>
            data.map((p: Product) => {
              const cartItem = storedCart.find((item: any) => item._id === p._id);
              if (cartItem) {
                if (cartItem.type === 'D') {
                  return { ...p, stockDocena: (p.stockDocena ?? 0) - (cartItem.quantity || 1) };
                } else {
                  return { ...p, stockIndividual: (p.stockIndividual ?? 0) - (cartItem.quantity || 1) };
                }
              }
              return p;
            })
          );
        }
      });
  }, []);

  useEffect(() => {
    // Leer el carrito del localStorage al cargar la página
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    //console.log(storedCart)
    //Actualizar el estado de los productos con el stock inicial
    // muy importante tener en cuenta el quantity del producto en el carrito
    // Restarle el quantity del producto en el carrito al stock inicial
    //console.log(products);
    
    // setProducts(prev =>
    //   prev.map(p => {
    //     const cartItem = storedCart.find((item: Product) => item._id === p._id);
    //     if (cartItem) {
    //       // console.log("Actualizando stock de producto", p._id);
    //       if( cartItem.type === 'D') {
    //         // console.log("Actualizando stock de docena");
    //         return { ...p, stockDocena: (p.stockDocena ?? 0) - (cartItem.quantity || 1) };
    //       }else {
    //         console.log("Actualizando stock de individual");
    //         return { ...p, stockIndividual: (p.stockIndividual ?? 0) - (cartItem.quantity || 1) };
    //       }
    //     }
    //     return p;
    //   })
    // );

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

    const initialStock = initialStocks[id];
    //obtener el stock actual del producto
    const currentStock = type === 'D' 
      ? products.find(p => String(p._id) === String(id))?.stockDocena 
      : products.find(p => String(p._id) === String(id))?.stockIndividual;

    console.log("stock Inicial", initialStock);
    console.log("Stock actual", currentStock);

    if(currentStock === 0){
      alert("No hay más unidades disponibles para este producto");
      return;
    }

    const newCart = cart.map(item =>
      item._id === id && item.type === type
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCart(newCart);

    
    // Sumar 1 al stock correspondiente, sin exceder el stock inicial
    setProducts(prev =>
      prev.map(p => {
        if (String(p._id) === String(id)) {
          if (type === 'D') {
            // const maxStock = initialStocks[id]?.stockDocena ?? 0;
            // const newStock = Math.min((p.stockDocena ?? 0) + 1, maxStock);
            return { ...p, stockDocena: (p.stockDocena ?? 0) - 1 };
          } else {
            //const maxStock = initialStocks[id]?.stockIndividual ?? 0;
            //const newStock = Math.min((p.stockIndividual ?? 0) + 1, maxStock);
            return { ...p, stockIndividual: (p.stockIndividual ?? 0) - 1 };
          }
        }
        return p;
      })
    );

    console.log("Productos", products);


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

    // Restar 1 al stock correspondiente, sin bajar de 0
    setProducts(prev =>
      prev.map(p => {
        if (String(p._id) === String(id)) {
          if (type === 'D') {
            //const newStock = Math.max((p.stockDocena ?? 0) - 1, 0);
            return { ...p, stockDocena: (p.stockDocena ?? 0) + 1 };
          } else {
            //const newStock = Math.max((p.stockIndividual ?? 0) + 1, 0);
            return { ...p, stockIndividual: (p.stockIndividual ?? 0) + 1 };
          }
        }
        return p;
      })
    );
  };

  // Añadir al carrito y actualizar el stock localmente
  const handleAddToCartAndUpdateStock = (product: Product, selectedOption: string) => {
    console.log(product);
    console.log(selectedOption);

    //console.log("stock Inicial", initialStocks[product._id]);
    // Añadir al carrito
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex((item: Product) => item._id === product._id && item.type === selectedOption);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1, price: selectedOption === 'D' ? product.docenaPrice : product.individualPrice, type: selectedOption });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);

    // Actualizar el stock en el estado products
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p._id === product._id) {
          if (selectedOption === 'D') {
            console.log("Restando 1 al stock de docena");
            //const newStockDocena = Math.max((p.stockDocena ?? 0) - 1, 0);
            return { ...p, stockDocena: (p.stockDocena ?? 0) -1 };
          } else {
            const newStockIndividual = Math.max((p.stockIndividual ?? 0) - 1, 0);
            return { ...p, stockIndividual: newStockIndividual };
          }
        }
        return p;
      })
    );

    //Mostrar el stock actual del producto
    console.log("Stock actualizado:", products.find(p => p._id === product._id)?.stockDocena, products.find(p => p._id === product._id)?.stockIndividual);
    
  };

  return (
    <div>
      <div className="flex justify-between items-center m-5">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
          Catálogo de Productos
        </h1>
        <button
          className="relative bg-peach-primary rounded-full p-3"
          onClick={() => {
            setShowCart(!showCart);
            if (!showCart && onShowCart) onShowCart();
          }}
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
                    className="bg-gray-200 text-green-500 font-bold p-2 text-xl"
                    onClick={() => handleIncrease(item._id, item.type)}
                    // disabled={}
                  >+</button>
                  <button
                    className="bg-gray-200 text-red-500 font-bold p-2 px-3 text-xl"
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
            key={product._id}
            _id={product._id}
            productId={product.productId}
            name={product.name}
            individualPrice={product.individualPrice}
            docenaPrice={product.docenaPrice}
            image={product.image}
            stockDocena={product.stockDocena}
            stockIndividual={product.stockIndividual}
            category={product.category}
            // Nuevo prop para manejar el stock local
            onAddToCart={handleAddToCartAndUpdateStock}
          />
        ))}
      </div>
    </div>
  )
}
