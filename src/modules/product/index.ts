import { Router } from "express";
import productController from "./product.controller";
import uploadCloud from "../../utils/upload";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const productRouter = Router();
productRouter.get("/all", productController.getProducts)
productRouter.post("/create-product",  authMiddleware, adminMiddleware, uploadCloud.array('images'), productController.createProduct);
productRouter.put("/edit-product/:productId", authMiddleware, adminMiddleware, uploadCloud.any(), productController.editProduct);
export default productRouter;