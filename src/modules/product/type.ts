interface StockDTO{size: string, color: string, quantity:number};
export interface ProductDTO {
    images: string[]
    name: string,
    categoryId: string,
    price: string,
    description: string | null,
    stock: StockDTO[];
};
export interface ProductEdit{
    productId: string,
    files: Express.Multer.File[];
    name: string,
    categoryId: string,
    price: string,
    description: string | null,
    stock: StockDTO[];
};
