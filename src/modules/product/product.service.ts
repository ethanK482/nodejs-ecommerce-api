import { Between, LessThan, Like } from "typeorm";
import { Product } from "../../databases/mysql/entities/Product";
import { ProductStock } from "../../databases/mysql/entities/ProductStock";
import { ProductImage } from "../../databases/mysql/entities/ProductImage";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";
import getImageDeletePath from "../../heplers/getImagePath";
import deleteImages from "../../heplers/deleteImage";
import 'express-async-errors';
import { ProductEditInfo, ProductInfo } from "./type";
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
        const result = await Product.findAndCount({ where: { ...whereClause }, skip, take, order })
        return result;
    }

    async createProduct({ name, categoryId, price, description = null, stock, images }: ProductInfo) {
        const createProduct = Product.create({ name, categoryId, description, price: Number(price) })
        const newProduct = await createProduct.save();
        const productStock = await Promise.all(stock.map(async (stockItem) => {
            const createStock = ProductStock.create({ ...stockItem, productId: newProduct.id })
            return await createStock.save();
        }))

        const productImages = await Promise.all(images.map(async (imageUrl, index) => {
            const createImage = ProductImage.create({ imageUrl, priority: index + 1, productId: newProduct.id })
            return await createImage.save();
        }))
        return { ...newProduct, productStock, productImages }
    }
    async editProduct({ productId, files, name, categoryId, price, description = null, stock }: ProductEditInfo) {
        const productExist = await this.findProductById(productId);
        if (!productExist) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Product not found" })
        let productImages: ProductImage[] = [];
        if (files.length > 0) {
            Promise.all(files.map(async (file) => {
                const { fieldname, path } = file;
                const productImage = await ProductImage.findOne({ where: { productId, priority: Number(fieldname) } });
                if (!productImage) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Image not found" })
                deleteImages(getImageDeletePath([productImage.imageUrl]))
                productImage.imageUrl = path;
                const editedImage = await productImage.save();
                productImages.push(editedImage);
            }))
        }
        ProductStock.createQueryBuilder().delete().where("productId = :productId", { productId }).execute();
        const productStock = await Promise.all(stock.map(async (stockItem) => {
            const createStock = ProductStock.create({ ...stockItem, productId })
            return await createStock.save();
        }))
        productExist.categoryId = categoryId;
        productExist.price = Number(price);
        productExist.name = name;
        productExist.description = description;
        const editedProduct = await productExist.save();
        return { ...editedProduct, productImages: productImages, productStock };
    }
    async findProductById(productId: string) {
        return await Product.findOne({ where: { id: productId } })
    }

}

export default new ProductService();