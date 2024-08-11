export type TProduct = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    image: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date
}