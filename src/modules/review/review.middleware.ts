import { checkSchema } from "express-validator";

class ReviewMiddleWare{
    createReview = checkSchema({
        productId: {
            notEmpty: {  errorMessage: "productId is required"},
        },
        message: {
            notEmpty: false,
            isLength: { errorMessage: "max length is 200 characters",   options: { max: 400 }
        }
        },
        rating: {
            notEmpty: {  errorMessage: "rating is required"},
            
            isNumeric : {  errorMessage: "rating must be a number"},
        },
    })
     
    editReview = checkSchema({
        message: {
            notEmpty: false,
            isLength: { errorMessage: "max length is 200 characters",   options: { max: 400 }
        }
        },
        rating: {
            notEmpty: {  errorMessage: "rating is required"},
            
            isNumeric : {  errorMessage: "rating must be a number"},
        },
    })
}
export default new ReviewMiddleWare();