import { checkSchema } from "express-validator";

class CouponMiddleware {
    createCoupon = checkSchema({
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
            isNumeric : {  errorMessage: "discount must be number"},
        },
    })
}
export default new CouponMiddleware();