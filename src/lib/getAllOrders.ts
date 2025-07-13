import { connectDB } from "@/lib/mongoDB";
import Order from "@/models/order";

export const getAllOrders = async () => {
    await connectDB();
    try {
        const orders = await Order.find();
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }
}