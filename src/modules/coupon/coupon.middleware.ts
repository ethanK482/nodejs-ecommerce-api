import { NextFunction } from "express";
import { ResponseCustom } from "../../utils/expressCustom";
import { checkSchema } from "express-validator";

class CouponMiddleware {
    createCategory = checkSchema({
        code: {
            notEmpty: {  errorMessage: "Code is required"},
            isString:  {  errorMessage: "Code must be string"},
        },
        startDate: {
            notEmpty: {  errorMessage: "startDate is required"},
        },
        endDate: {
            notEmpty: {  errorMessage: "startDate is required"},
        },
        discount: {
            notEmpty: {  errorMessage: "discount is required"},
            isNumeric : {  errorMessage: "discount is required"},
        },
    })
}
export default new CouponMiddleware();