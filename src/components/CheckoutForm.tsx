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
import ShippingForm from './ShippingForm';
import { set } from 'mongoose';

export const CheckoutForm = ({amount, products}: {amount: number, products: Product[]}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [errorAddress, setErrorAddress] = useState<boolean>(false);
  const [shippingData, setShippingData] = useState<any>(null);

  const handleShippingForm = (shippingData: any) => {
    //console.log("Datos de envío recibidos desde el componente hijo:", shippingData);
    //Actualizamos el estado shippingData solo si todos los campos están completos
    if(shippingData.fullName && shippingData.phone && shippingData.street && shippingData.number && shippingData.neighborhood && shippingData.postalCode) {
    setShippingData(shippingData);
      
    }
    const { neighborhood } = shippingData;
    //console.log("Vecindario:", neighborhood);
    setAddress(neighborhood);
  }

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

    if(!shippingData || !shippingData.fullName || !shippingData.phone || !shippingData.street || !shippingData.number || !shippingData.neighborhood || !shippingData.postalCode) {
      toast.error("Por favor, completa todos los campos de envío.");
      setLoading(false);
      return;
    }

    //COdigo comentado para buscar la dirección en Google Maps
    // const SearchForAddress = address;
    // const resultado = SearchForAddress.replace(/ /g, "+");
    // try {
    //   const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${resultado}&key=${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY}`);
    //   const data = await res.json();
    //   console.log("Datos de la dirección:", data);
    //   const city = data.results[0]?.address_components[1]?.long_name;
    //   const city2= data.results[0]?.address_components[2]?.long_name;

    //   if((city !== 'Cancún') && (city2 !== 'Cancún')){
    //       toast.error("La colonia o barrio ingresado no pertenece a la ciudad de Cancún");
    //       setErrorAddress(true);
    //       setLoading(false);
    //       return;
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   return;
    // }

    // Aquí llamas a tu API para obtener el clientSecret
    try {
      const paymentIntentRes = await fetch('/api/create-payment-intent', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
          products: products.map(({image, name, individualPrice, docenaPrice, price, ...rest})=> rest),
          shippingData: shippingData, 
        }), 
      });
      const paymentIntentData = await paymentIntentRes.json();
      setClientSecret(paymentIntentData.clientSecret);

      // Espera a que el estado se actualice antes de continuar
      // O usa directamente paymentIntentData.clientSecret aquí:
      const {error, paymentIntent} = await stripe.confirmPayment({
        elements,
        clientSecret: paymentIntentData.clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000/success",
        },
        redirect: "if_required", // Importante: solo redirige si es necesario
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Pago realizado con éxito");
        window.location.href = "http://localhost:3000/success";
      }
      // Si el pago requiere redirección, Stripe lo hará automáticamente y este código no se ejecutará
    } catch (error) {
      setErrorMessage("Error al procesar el pago.");
    }

    setLoading(false);
  };

  if(!stripe || !elements) {
    return <div>Cargando...</div>;
  }

  return (
   <>
    <Toaster position="top-center" />
    <form onSubmit={handleSubmit}>
     <PaymentElement/>
      <h2>Dirección de Envío</h2>
      <div>
        <label>
          <h2 className='text-red-500 font-bold text-center'>Solo se hacen envios en Cancún</h2>
        </label>
      </div>
      {/* <h2>Ingrese su direccion completa incluyendo calle y despues su numero de casa o apartamento</h2> */}
      <ShippingForm onShippingData={handleShippingForm}/>
      {errorAddress && <p className='text-red-500'>La colonia o barrio Ingresado no es de Cancún</p>}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
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
