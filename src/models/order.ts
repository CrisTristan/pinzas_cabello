import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema({
    id: String,
    name: String,
    address: {line1: String, line2: String, city: String, state: String, zip: String},
    products: [{
        id: String,
        name: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
    }],
    total: Number,
    status: { type: String, enum: ["por entregar", "entregado"], default: "por entregar" },
    createdAt: { type: Date, default: Date.now },
    deliveryDate: { type: Date, default: "" }
})

export default mongoose.models.Order || mongoose.model("Order", schema);