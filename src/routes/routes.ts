import { Router } from "express";
import userRouter from "../modules/user";
import productRouter from "../modules/product";
import categoryRouter from "../modules/category";
import couponRouter from "../modules/coupon";
import reviewRouter from "../modules/review";
import orderRouter from "../modules/order";

const router = Router();
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/coupon", couponRouter);
router.use("/review", reviewRouter);
router.use("/order", orderRouter);


export default router;
