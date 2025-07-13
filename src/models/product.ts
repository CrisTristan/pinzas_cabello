import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    individualPrice: Number,
    docenaPrice: Number,
    description: String,
    stock: Number
})

export default mongoose.models.Product || mongoose.model("Product", schema);