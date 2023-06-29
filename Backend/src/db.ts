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
  products: { id: string }[]; // Add the 'products' field to the Order interface
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

type DBData = {
  products: Product[];
  orders: Order[];
};

export const db: DBData = {
  products: [
    {
      id: 'c5ec02c0-60c0-4a67-9614-6e64e8f7d343',
      name: 'Canon 50d',
      price: 1500,
      description: 'Classic camera for aspiring photographers',
      img: '/assets/images/products/iphone12.png',
    },
    {
      id: '4b2db7a8-00e7-4099-959d-30d846c9de08',
      name: 'Sony A7',
      price: 9000,
      description: 'Professional camera for professional photographers',
      img: '/assets/images/products/iphone12.png',
    },
    {
      id: '105224b7-9f2f-4a22-9e5f-fd4cd831af9e',
      name: 'Nikon D750',
      price: 8000,
      description: 'Small camera with big features',
      img: '/assets/images/products/iphone12pro.png',
    },
  ],
  orders: [
    {
      id: 'b8447e79-8a43-44d0-8f9a-623cc5355bd5',
      productId: ['c5ec02c0-60c0-4a67-9614-6e64e8f7d343'],
      products: [{ id: 'c5ec02c0-60c0-4a67-9614-6e64e8f7d343' }],
      totalPrice: 0,
      firstName: 'John',
      lastName: 'Doe',
      country: 'USA',
      city: 'New York',
      zip: '10001',
      street: '1234 Main St',
      apartmentNumber: '',
      paymentType: 'Credit Card',
      cardName: 'John Doe',
      cardNumber: '**** **** **** 1234',
      cardExpiration: '12/24',
      cardCVV: '123',
    },
  ],
};
