import { NextFunction, Request } from "express";
import { ResponseCustom } from "../../utils/expressCustom";
import productService from "../product/product.service";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";
import reviewService from "./review.service";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../../exception/RequestValidationError";

class ReviewController {
    async createReview(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
            const { userId } = request.userInfo;
            const { productId, message, rating } = request.body;
            const productExist = await productService.findProductById(productId);
            if (!productExist) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Product not found" });
            const review = await reviewService.createReview({ userId, productId, message, rating });
            return response.status(HttpStatusCode.CREATED).json({ message: "Review successfully", data: { review } })
        } catch (error) {
            next(error);
        }
    }

    async editReview(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const { reviewId } = request.params;
            const { message, rating } = request.body;
            const review = await reviewService.editReview({ reviewId, message, rating })
            return response.status(HttpStatusCode.CREATED).json({ message: "Edit review successfully", data: { review } })
        } catch (error) {
            next(error)
        }
    }

    async deleteReview(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const { reviewId } = request.params;
            let reviewExist = await reviewService.findReviewById(reviewId);
            if (!reviewExist) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Review not found" });
            reviewService.deleteReview(reviewId);
            return response.status(HttpStatusCode.OK).json({ message: "Delete review successfully" })
        } catch (error) {
            next(error)
        }
    }

    async getAllReview(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const reviews = await reviewService.finAllReview();
            return response.status(HttpStatusCode.OK).json({ message: "Fetch review successfully", data: { reviews } })
        } catch (error) {
            next(error)
        }
    }
}
export default new ReviewController();