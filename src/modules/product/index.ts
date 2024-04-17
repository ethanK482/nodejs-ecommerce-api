import { NextFunction, Router, Request, Response } from "express";
import productController from "./product.controller";
import uploadCloud from "../../utils/upload";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ResponseCustom } from "../../utils/expressCustom";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";

const productRouter = Router();
productRouter.get("/all", productController.getProducts)
productRouter.post("/create-product",  authMiddleware, adminMiddleware, uploadCloud.array('images'), productController.createProduct);
productRouter.post("/edit-product/:productId", authMiddleware, adminMiddleware, uploadCloud.any(), productController.editProduct);
export default productRouter;