import { Router } from "express";
import categoryController from "./category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import uploadCloud from "../../utils/upload";

const categoryRouter = Router();
categoryRouter.post("/create-category", authMiddleware, adminMiddleware, uploadCloud.single('image'), categoryController.createCategory);
categoryRouter.put("/edit-category/:categoryId", authMiddleware, adminMiddleware, uploadCloud.single('image'), categoryController.editCategory);
export default categoryRouter;