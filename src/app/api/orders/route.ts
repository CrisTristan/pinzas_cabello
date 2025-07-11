import { connectDB } from "@/lib/mongoDB";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB();

    const orders = await Order.find();
    return NextResponse.json(orders);
}

export async function POST(request: Request) {
    await connectDB();
    const data = await request.json();
    const newOrder = new Order(data);
    try {
        await newOrder.save();
        return NextResponse.json(newOrder, { status: 201 });
    }catch (error) {
        console.error("Error al crear la orden:", error);
        return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 });
    }
}