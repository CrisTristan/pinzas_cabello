import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    price: Number,
    description: String,
})

export default mongoose.models.Product || mongoose.model("Product", schema);