interface StockInfo{size: string, color: string, quantity:number};
export interface ProductInfo {
    images: string[]
    name: string,
    categoryId: string,
    price: string,
    description: string | null,
    stock: StockInfo[];
};
export interface ProductEditInfo{
    productId: string,
    files: Express.Multer.File[];
    name: string,
    categoryId: string,
    price: string,
    description: string | null,
    stock: StockInfo[];
};
