export type Product = {
    _id: number;
    productId: number;
    name: string;
    individualPrice: number;
    docenaPrice: number;
    price?: number; // Precio total, puede ser individualPrice o docenaPric
    image: string;
    stockDocena?: number; // Opcional para manejar el stock de docenas
    stockIndividual?: number; // Opcional para manejar el stock individual
    type?: string; // Opcional para manejar opciones como "Docena" o "Individual"
    quantity?: number; // Opcional para manejar la cantidad en el carrito
};

