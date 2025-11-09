export interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
