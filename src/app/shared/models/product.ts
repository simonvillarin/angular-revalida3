export interface Product {
    prodId?: number;
    productName: string;
    brand: string;
    category: string;
    description: string[];
    img: string;
    quantity: number;
    price: number;
    numOfUserRated: number;
    ratings: number;
    isAvailable: boolean;
}
