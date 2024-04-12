import { ProductStock } from "../../databases/mysql/entities/ProductStock";

export type ProductStockDTO = Omit<ProductStock, "productId">;
export interface ProductImageDTO {
    imageUrl: string;
    priority: number,
}