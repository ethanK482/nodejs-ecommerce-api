import { checkSchema } from "express-validator";

const createProductMiddleware = checkSchema({
    name: {
        notEmpty: { errorMessage: "Product name is required" }
    },
    categoryId: {
        notEmpty: { errorMessage: "Category is required" }
    },
    price: {
        notEmpty: { errorMessage: "Category is required" }
    },
    totalQty: {
        notEmpty: { errorMessage: "Category is required" }
    },
    productStock: {
        notEmpty: { errorMessage: "Category is required" },
        isObject: { errorMessage: "product stock must be an array" },
    },
    images: {
        notEmpty: { errorMessage: "Product images is required" },
        isArray: { errorMessage: "Product images  must be an array" },
    },
})