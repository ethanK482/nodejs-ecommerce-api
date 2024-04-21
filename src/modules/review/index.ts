import { Router } from "express";
import reviewController from "./review.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import reviewMiddleware from "./review.middleware";

const reviewRouter = Router();
reviewRouter.post("/create",reviewMiddleware.createReview , authMiddleware, adminMiddleware,  reviewController.createReview)
reviewRouter.put("/edit/:reviewId",reviewMiddleware.editReview , authMiddleware, adminMiddleware,  reviewController.editReview)
reviewRouter.delete("/delete/:reviewId", authMiddleware, adminMiddleware, reviewController.deleteReview)
reviewRouter.get("/all", reviewController.getAllReview)
export default reviewRouter;