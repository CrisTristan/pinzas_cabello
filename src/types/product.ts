export type Product = {
    _id: number;
    name: string;
    price: number;
    image: string;
    selectedOption?: string; // Opcional para manejar opciones como "Docena" o "Individual"
    quantity?: number; // Opcional para manejar la cantidad en el carrito
};

