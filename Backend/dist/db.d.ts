export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    img?: string;
}
export interface Order {
    id: string;
    productId: string[];
    products: {
        id: string;
    }[];
    totalPrice: number;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    zip: string;
    street: string;
    apartmentNumber: string;
    paymentType: string;
    cardName: string;
    cardNumber: string;
    cardExpiration: string;
    cardCVV: string;
}
declare type DBData = {
    products: Product[];
    orders: Order[];
};
export declare const db: DBData;
export {};
