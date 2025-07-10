"use client"

import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  AddressElement
} from '@stripe/react-stripe-js';

export const CheckoutForm = ({amount}: {amount: number}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [errorAddress, setErrorAddress] = useState<boolean>(false);
  const [errorAddress1, setErrorAddress1] = useState<boolean>(false);
  const [errorAddress2, setErrorAddress2] = useState<boolean>(false);


  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
  });


  useEffect(() => {
    fetch('/api/create-payment-intent', { method: 'POST' })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    //console.log(address); //verificar que la direccion este en Cancún.
    if(address.line1 === ""){
        toast.error("Ingrese una direccion completa en Primera Linea de Dirección incluyendo Calle")
        setErrorAddress1(true);
        return;
    }

    if(address.line2 === ""){
      toast.error('Ingrese su numero de casa o apartamento en Segunda linea de Dirección')
      setErrorAddress2(true);
      return;
    }

    const SearchForAddress = address.line1;
    const resultado = SearchForAddress.replace(/ /g, "+");
    try {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${resultado}&key=${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY}`)
      .then((res)=> res.json())
      .then((data)=> {
        const city = data.results[0].address_components[2].long_name;
        console.log(data);
        if(city != 'Cancún'){
            toast.error("La dirección ingresada no pertenece a la ciudad de Cancún");
            setErrorAddress(true);
            return;
        } 

      })
      .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
    
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!, // Asegúrate de que CardElement esté presente
      },
      return_url: "http://localhost:3000/success", // Cambia esto a tu URL de éxito
    });

    if (result.error) {
      toast.error(""+result.error.message);
    } else {
      alert('✅ Pago exitoso');
    }
  };

  return (
   <>
    <Toaster position="top-center" />
    <form onSubmit={handleSubmit}>
      {/* {clientSecret && <PaymentElement/>} */}
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
          defaultValues: {
            address: {
              line1: "",
              line2: "",
              city: 'Cancún',
              country: 'MX',
              postal_code: '77500',
            },
          },
        }}
        onChange={(event) => {
          const { line1, line2, city } = event.value.address || {};
          setAddress({
            line1: line1 || '',
            line2: line2 || '',
            city: city || '',
          });
        }}

      />
      {/* {errorAddress1 && <p className='text-red-500'>Ingrese una direccion completa en <span className='font-bold'>"Primera Linea de Dirección"</span> incluyendo Calle</p>}
      {errorAddress2 && <p>Ingrese su numero de casa o apartamento en <span>"Segunda Linea de Dirección"</span></p>} */}
      <h2>Tarjeta</h2>
      <CardElement />
      {errorAddress && <p className='text-red-500'>La direccion Ingresada no es de Cancún</p>}
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Pagar
      </button>

    </form>
    </>
  );
}
