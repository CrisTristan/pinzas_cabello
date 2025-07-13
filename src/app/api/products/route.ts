import { connectDB } from "@/lib/mongoDB";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


export async function GET(request: Request) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
        }
        return NextResponse.json(product);
    } else {
        const products = await Product.find();
        return NextResponse.json(products);
    }
}

export async function POST(request: Request) {
    await connectDB();
    const data = await request.json();
    const newProduct = new Product(data);
    try {
        await newProduct.save();
        return NextResponse.json(newProduct, { status: 201 });
    }catch (error) {
        console.error("Error al crear el producto:", error);
        return NextResponse.json({ error: "Error al crear el producto" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Falta el parámetro 'id'" }, { status: 400 })
    }

    const body = await req.json()
    const { name, stock, individualPrice, docenaPrice } = body

    console.log(stock);
    console.log(typeof stock)
    console.log(individualPrice);
    console.log(typeof individualPrice)
    console.log(docenaPrice)
    console.log(typeof docenaPrice)


    if (typeof stock !== "number" || stock < 0) {
      return NextResponse.json({ error: "Stock inválido" }, { status: 400 })
    }

    // if (typeof individualPrice !== "number" || typeof docenaPrice !== "number") {
    //   return NextResponse.json({ error: "Precio inválido" }, { status: 400 })
    // }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, stock, individualPrice, docenaPrice },
      { new: true }
    )
    
    console.log(updatedProduct);

    if (!updatedProduct) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Producto actualizado", product: updatedProduct })
  } catch (error) {
    // console.log(error);
    // console.error("Error al actualizar el producto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Falta el parámetro 'id'" }, { status: 400 })
    }

    const deleted = await Product.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Producto eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar el producto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

