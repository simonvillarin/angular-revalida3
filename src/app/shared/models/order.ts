export interface Order {
  orderId: number;
  orderTracking: number;
  userId: number;
  productId: number;
  productName: string;
  category: string;
  description: string[];
  img: string;
  quantity: number;
  price: number;
  orderDate: string;
}
