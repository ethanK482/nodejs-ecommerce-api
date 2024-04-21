import express, { Router } from "express";
import orderMiddleware from "./order.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import orderController from "./order.controller";

const orderRouter = Router();
orderRouter.post("/create", orderMiddleware.createOrder, authMiddleware, orderController.createOrder)
orderRouter.get("/all", orderMiddleware.createOrder, authMiddleware, orderController.getAllOrder)
export default orderRouter;