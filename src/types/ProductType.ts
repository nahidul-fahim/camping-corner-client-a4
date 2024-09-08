export type TProduct = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    image: string;
    isDeleted: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date
}


export type TCartItem = {
    _id: string;
    user: string;
    quantity: number;
    updatedAt: Date;
    createdAt: Date;
    product: TProduct;
};