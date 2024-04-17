import e, { Request, NextFunction } from "express"
import "express-async-error"
import { ResponseCustom } from "../../utils/expressCustom"
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";
import deleteImages from "../../heplers/deleteImage";
import getImageDeletePath from "../../heplers/getImagePath";
import categoryService from "./category.service";
import { HttpStatusCode } from "../../utils/httpStatusCode";
class CategoryController {
    async createCategory(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const file = request.file;
            if (!file) {
                throw new BadRequestErr({ errorCode: ErrorCode.FAILED_VALIDATE_BODY, errorMessage: "At least 1 image" })
            }
            const { name } = request.body;
            if (!name) {
                deleteImages(getImageDeletePath([file.path]));
                throw new BadRequestErr({ errorCode: ErrorCode.FAILED_VALIDATE_BODY, errorMessage: "Invalid body" })
            }
            const category = await categoryService.createCategory(name, file.path);
            return response.status(HttpStatusCode.CREATED).json({
                message: "Create category successfully",
                data: { category }
            })

        } catch (error) {
            next(error);
        }
    }
}
export default new CategoryController();