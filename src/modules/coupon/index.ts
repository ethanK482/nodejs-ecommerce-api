import { Router } from "express";
import couponController from "./coupon.controller";
import couponMiddleware from "./coupon.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const couponRouter = Router();
couponRouter.post("/create", couponMiddleware.createCategory,  authMiddleware, adminMiddleware, couponController.createCoupon);
couponRouter.put("/edit/:couponId",  authMiddleware, adminMiddleware, couponController.editCoupon);
couponRouter.delete("/delete/:couponId",  authMiddleware, adminMiddleware, couponController.deleteCoupon );
couponRouter.get("/all", couponController.getAllCoupon );
export default couponRouter;