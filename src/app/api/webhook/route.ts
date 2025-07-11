import { NextResponse } from "next/server";
import {headers} from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  
    const body = await request.text(); //aqui se encuentra la direccion del cliente
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      endPointSecret
    );
  } catch (err) {
    console.error(`Error message: ${err}`); 
    return NextResponse.json(
      `Webhook Error: ${err}`,
      { status: 400 }
    );
  }

  switch(event.type){
    case "checkout.session.completed":
      
      const checkoutSessionCompleted = event.data.object;

      //Guardar en la base de datos
      console.log('Consultando Producto con id:', checkoutSessionCompleted.metadata?.productId);

      //Enviar un correo al cliente o al administrador

      console.log("Checkout session completed:", checkoutSessionCompleted);
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // Aquí puedes manejar el pago exitoso
      console.log("PaymentIntent was successful!", paymentIntentSucceeded);
      break;
      
    default:
      console.log("Evento no manejado:", event.type);
  }

  return new Response(null, {status: 200});
}