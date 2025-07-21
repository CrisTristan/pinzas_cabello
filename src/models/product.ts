import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    image: String,
    individualPrice: Number,
    docenaPrice: Number,
    description: String,
    stockDocena: Number,
    stockIndividual: Number,
})

export default mongoose.models.Product || mongoose.model("Product", schema);