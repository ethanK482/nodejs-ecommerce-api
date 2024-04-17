import  { Request, NextFunction } from "express";
import { ResponseCustom } from "../../utils/expressCustom";
import paginate from "../../heplers/paginate";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";
import getImageDeletePath from "../../heplers/getImagePath";
import deleteImages from "../../heplers/deleteImage";
import productService from "./product.service";
import "express-async-error"
class ProductController {
    async createProduct(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const files: Express.Multer.File[] = request.files as Express.Multer.File[];
            if (files.length < 1) throw new BadRequestErr({ errorCode: ErrorCode.FAILED_VALIDATE_BODY, errorMessage: "At least 1 image" })
            const paths = files?.map(image => image.path)
            const { name, categoryId, price, description, stock } = request.body;
            if (!name || !categoryId || !price! || !stock) {
                deleteImages(getImageDeletePath(paths));
                throw new BadRequestErr({ errorCode: ErrorCode.FAILED_VALIDATE_BODY, errorMessage: "Invalid body" })
            }

            const stockParsed = JSON.parse(stock)
            const product = await productService.createProduct({ images: paths, name, categoryId, price, description, stock: stockParsed })
            return response.status(HttpStatusCode.OK).json({
                message: "Successfully",
                data: { product }
            })
        } catch (error) {
            next(error)
        }


    }
    async editProduct(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const { productId } = request.params;
            if (!productId) throw new BadRequestErr({ errorCode: ErrorCode.MISS_PARAMS, errorMessage: "productId is required" });
            const { name, categoryId, price, description, stock } = request.body;
            const files: Express.Multer.File[] = request.files as Express.Multer.File[];
            const stockParsed = JSON.parse(stock)
            const product = await productService.editProduct({ productId, files, name, categoryId, price, description, stock: stockParsed });
            return response.status(HttpStatusCode.OK).json({
                message: "Successfully",
                data: { product }
            })
        } catch (error) {
            next(error)
        }
    }
    async getProducts(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const { page = 1, limit = 20, name, category, minPrice, maxPrice, sort } = request.query;
            if (sort) {
                if (!['asc', 'desc'].includes((String(sort)).toLowerCase())) {
                    throw new BadRequestErr({
                        errorCode: ErrorCode.INVALID_FORMAT,
                        errorMessage: "Invalid sort option"
                    })
                }
            }
            const { skip, take } = paginate(page as string, limit as string);
            const [products, total] = await productService
                .getAndCountProduct(skip, take, name as string, category as string, minPrice as string, maxPrice as string, sort as string);
            return response.status(HttpStatusCode.OK).json({
                message: "Successfully",
                data: { products, page, limit, total }
            })
        } catch (error) {
            next(error);
        }

    }
}
export default new ProductController();