import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req : Request) {

  const body = await req.json();

  console.log(body);
    const session = await stripe.checkout.sessions.create({
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        shipping_address_collection:{
          allowed_countries: ["MX"],
        },
        shipping_options: [
            // {
            //     shipping_rate_data: {
            //         type: "fixed_amount",
            //         fixed_amount: {
            //             amount: 0, // Free shipping
            //             currency: "mxn",
            //         },
            //         display_name: "Envío gratis",
            //         delivery_estimate: {
            //             minimum: {
            //                 unit: "business_day",
            //                 value: 1,
            //             },
            //             maximum: {
            //                 unit: "business_day",
            //                 value: 3,
            //             },
            //         },
            //     },
            // },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                    amount: 5000, // $100.00 MXN //revisar el precio de envio
                    currency: "mxn",
                },
                display_name: "Envío express",
                delivery_estimate: {
                    minimum: {
                        unit: "business_day",
                        value: 1,
                    },
                    maximum: {
                        unit: "business_day",
                        value: 2,
                    },
                },
              }
            }
        ],
        line_items: [
            {
              price_data: {
                currency: "mxn",
                product_data: {
                    name: body.name,
                    images: [body.image],
                },
                unit_amount: body.price * 100, // Convert to cents
                }, 
                quantity: 1,     
            }
        ],
        metadata: {
            productId: body.id,
        },
        mode: "payment",
    });

    console.log(session);
  return NextResponse.json(session);
}