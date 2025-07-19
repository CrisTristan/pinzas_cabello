import { connectDB } from "@/lib/mongoDB";
import Order from "@/models/order";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
      }

      const order = await Order.findById(id);
      if (!order) {
        return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });
      }

      return NextResponse.json(order);
    } else {
      const orders = await Order.find();
      return NextResponse.json(orders);
    }
  } catch (error) {
    console.error('Error al obtener orden(es):', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
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

export async function PUT(req: Request) {
  try {
    await connectDB(); // Asegúrate de conectar a la DB

    const body = await req.json();
    const { _id, status } = body;
    console.log(body);
    if (!_id) {
      return NextResponse.json({ error: 'Falta el ID de la orden' }, { status: 400 });
    }

    const orden = await Order.findByIdAndUpdate(_id, {status}, { new: true });

    if (!orden) {
      return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });
    }

    return NextResponse.json(orden, { status: 200 });

  } catch (error) {
    console.error('Error actualizando orden:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Falta el parámetro id' }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Orden eliminada correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}


