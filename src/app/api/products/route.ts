import { connectDB } from "@/lib/mongoDB";
import Product from "@/models/product";
import { NextResponse } from "next/server";
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