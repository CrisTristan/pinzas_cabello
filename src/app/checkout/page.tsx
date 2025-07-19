'use client';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { CheckoutForm } from '@/components/CheckoutForm';
import { OrderSummary } from '@/components/OrderSummary';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  let products = [];
  try {
    const cartParam = searchParams.get('cart');
    if (cartParam) {
      products = JSON.parse(cartParam);
      console.log('Productos del carrito:', products);
    }
  } catch (e) {
    products = [];
  }

  // Calcular el total del carrito
  const amount = products.reduce(
    (acc: number, item: any) => acc + (item.price * (item.quantity || 1)),
    0
  );

  console.log(amount);
  
  const deliveryCost = 50; // Costo de envío fijo
  const totalAmount = amount + deliveryCost;

  return (
    <Elements stripe={stripePromise}
      options={{
      mode: 'payment',
      amount: convertToSubcurrency(totalAmount),
      currency: 'mxn',
      }}
    >
      <OrderSummary products={products} />
      <CheckoutForm amount={totalAmount} products={products}/>
    </Elements>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}