import { NextResponse } from "next/server";
import {headers} from "next/headers";
import Stripe from "stripe";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongoDB";
import Order from "@/models/order";

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
      const { metadata } = paymentIntentSucceeded;

  // Parsear productos y dirección
  const products = JSON.parse(metadata.productos);
  const shippingData = JSON.parse(metadata.shippingData);

  const order = {
    id: paymentIntentSucceeded.id,
    name: shippingData.fullName,
    address: {
      nombre: shippingData.fullName,
      telefono: shippingData.phone,
      calle: shippingData.street,
      numero: shippingData.number,
      colonia: shippingData.neighborhood,
      codigoPostal: Number(shippingData.postalCode),
    },
    products: products.map((product: any) => ({
      productId: product._id, // <-- cambiar _id a id
      selectedOption: product.selectedOption, // se guarda como 'type'
      quantity: product.quantity || 1,
    })),
    total: paymentIntentSucceeded.amount / 100,
  };

      await connectDB();
          try {
              const newOrder = new Order(order);
              await newOrder.save();
              return NextResponse.json(newOrder, { status: 201 });
          }catch (error) {
              console.error("Error al crear la orden:", error);
              return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 });
          }

      break;
      
    default:
      console.log("Evento no manejado:", event.type);
  }

  return new Response(null, {status: 200});
}