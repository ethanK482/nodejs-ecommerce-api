import { Between, LessThan, Like } from "typeorm";
import { Product } from "../../databases/mysql/entities/Product";

class ProductService {
    async getAndCountProduct
        (skip: number, take: number, name: string, categoryId: string, minPrice: string, maxPrice: string, sort: string) {
        let whereClause = {};
        let order = {};
        if (name) {
            whereClause = { name: Like(`%${name}%`) }
        }
        if (categoryId) {
            whereClause = { categoryId }
        }
        if (minPrice && maxPrice) {
            whereClause = { ...whereClause, price: Between(minPrice, maxPrice) }
        }
        if (sort) {
            order = { price: sort.toUpperCase() }
        }
        const result = await Product.findAndCount({ where: { ...whereClause }, skip, take, order})
        return result;
    }
}
export default new ProductService();
