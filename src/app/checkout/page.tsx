'use client';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { CheckoutForm } from '@/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {

  const amount = 49.99;

  return (
    <Elements stripe={stripePromise}
      options={{
      mode: 'payment',
      amount: convertToSubcurrency(amount), // $50.00 MXN
      currency: 'mxn',
      }}
    >
      <CheckoutForm  amount={amount}/>
    </Elements>
  );
}