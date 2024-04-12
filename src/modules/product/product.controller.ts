import { Request, NextFunction } from "express";
import { ResponseCustom } from "../../utils/expressCustom";
import paginate from "../../heplers/paginate";
import productService from "./product.service";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";

class ProductController {

    async createProduct(request: Request, response: ResponseCustom, next: NextFunction) {
        console.log(request.file)
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