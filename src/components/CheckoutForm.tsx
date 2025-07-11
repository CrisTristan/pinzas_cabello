"use client"

import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Product } from '@/types/product';

export const CheckoutForm = ({amount, products}: {amount: number, products: Product}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const [errorAddress, setErrorAddress] = useState<boolean>(false);
  const [errorAddress1, setErrorAddress1] = useState<boolean>(false);
  const [errorAddress2, setErrorAddress2] = useState<boolean>(false);


  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
  });


  useEffect(() => {
    fetch('/api/create-payment-intent', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        products: JSON.stringify(products) 
      }), // Convert to subcurrency
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const {error: submitError} = await elements.submit();

    if(submitError){
        setErrorMessage(submitError?.message);
        setLoading(false);
        return;
    }

    // Validación manual del teléfono
    if (!phone || phone.trim() === '' || phone.length < 10) {
      setErrorPhone(true);
      setLoading(false);
      toast.error("El número de teléfono es obligatorio y debe tener al menos 10 dígitos.");
      return;
    }

    // Debes esperar a que la validación de la dirección termine antes de continuar.
    // El problema es que fetch es asíncrono y no esperas su resultado antes de continuar.
    // Solución: usa await en la validación de dirección y retorna si hay error.

    // Mueve la validación de dirección aquí y usa await:
    if(address.line1 === ""){
        toast.error("Ingrese una direccion completa en Primera Linea de Dirección incluyendo Calle")
        setErrorAddress1(true);
        setLoading(false);
        return;
    }

    if(address.line2 === ""){
      toast.error('Ingrese su numero de casa o apartamento en Segunda linea de Dirección')
      setErrorAddress2(true);
      setLoading(false);
      return;
    }

    const SearchForAddress = address.line1;
    const resultado = SearchForAddress.replace(/ /g, "+");
    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${resultado}&key=${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY}`);
      const data = await res.json();
      console.log("Respuesta de la API de Google Maps:", data);
      const city = data.results[0]?.address_components[2]?.long_name;
      //console.log("Ciudad encontrada:", city);
      if(city !== 'Cancún'){
          toast.error("La dirección ingresada no pertenece a la ciudad de Cancún");
          setErrorAddress(true);
          setLoading(false);
          return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    // ...continúa solo si la dirección es válida...

    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/success", // Cambia esto a tu URL de éxito
      },
    });

    if(error) {
      setErrorMessage(error.message);
    }else{
        toast.success("Pago realizado con éxito");
    }

    setLoading(false);
    
  };

  if(!clientSecret || !stripe || !elements) {
    return <div>Cargando...</div>;
  }

  return (
   <>
    <Toaster position="top-center" />
    <form onSubmit={handleSubmit}>
     {clientSecret && <PaymentElement/>}
      <h2>Dirección de Envío</h2>
      <div>
        <label>
          <h2 className='text-red-500 font-bold text-center'>Solo se hacen envios en Cancún</h2>
        </label>
      </div>
      {/* <h2>Ingrese su direccion completa incluyendo calle y despues su numero de casa o apartamento</h2> */}
      <AddressElement
        options={{
          mode: 'shipping',
          fields: {
            phone: 'always'
          },
          defaultValues: {
            address: {
              line1: "",
              line2: "",
              city: 'Cancún',
              country: 'MX',
              postal_code: '77500',
              state: 'Q.R.',
            },
            phone: '998'
          },
        }}
        onChange={(event) => {
          const { line1, line2, city } = event.value.address || {};
          const phoneValue = event.value.phone || '';

          setAddress({
            line1: line1 || '',
            line2: line2 || '',
            city: city || '',
          });

          setPhone(phoneValue);
          if (phoneValue.trim() !== '') {
          setErrorPhone(false); // limpiar error si se corrige
          }

        }}
      />
      
      {errorAddress && <p className='text-red-500'>La direccion Ingresada no es de Cancún</p>}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
      {errorPhone && (
        <p className="text-red-500">El número de teléfono es obligatorio.</p>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {!loading ? `Pagar $${amount}` : 'Procesando...'}
      </button>  
    </form>
    </>
  );
}
