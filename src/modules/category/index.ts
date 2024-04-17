import { Router } from "express";
import categoryController from "./category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const categoryRouter = Router();
categoryRouter.post("create-category", authMiddleware, adminMiddleware, categoryController.createCategory)