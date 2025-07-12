import mongoose, { model } from "mongoose";
import { required } from "zod/mini";

const schema = new mongoose.Schema({
    id: String,
    name: String,
    address: {nombre: String, telefono: String, calle: String, numero: String, colonia: String, codigoPostal: Number},
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        selectedOption: { type: String, required: true }, // se guarda como 'type'
        quantity: { type: Number, default: 1 },
    }],
    total: Number,
    status: { type: String, enum: ["por entregar", "entregado"], default: "por entregar" },
    createdAt: { type: Date, default: Date.now },
    deliveryDate: { type: Date, default: "" }
})

export default mongoose.models.Order || mongoose.model("Order", schema);