import { Router } from "express";
import userRouter from "../modules/user";
import productRouter from "../modules/product";
import categoryRouter from "../modules/category";
import couponRouter from "../modules/coupon";

const router = Router();
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/coupon", couponRouter);


export default router;
