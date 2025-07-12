import { metadata } from '@/app/layout';
import { NextRequest, NextResponse } from 'next/server';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {

  try {
    const {amount, products, shippingData} = await request.json();
    // const {products} = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // $50.00 MXN
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
      metadata: {
        productos: JSON.stringify(products),
        shippingData: JSON.stringify(shippingData),
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log("internal error:", err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}