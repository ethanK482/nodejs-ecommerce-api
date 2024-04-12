import { Router } from "express";
import userRouter from "../modules/user";
import productRouter from "../modules/product";

const router = Router();
router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;
