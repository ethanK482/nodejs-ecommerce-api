import { NextFunction, Router, Request } from "express";
import productController from "./product.controller";
import uploadCloud from "../../utils/upload";
import { ResponseCustom } from "../../utils/expressCustom";
const productRouter = Router();
productRouter.get("/all", productController.getProducts)
productRouter.post("/create-product", uploadCloud.array('images'), (request: Request, response: ResponseCustom, next: NextFunction) => {
    console.log(request.files);
}
)
export default productRouter;