import 'express-async-errors';
import { OrderItem } from "../../databases/mysql/entities/OrderItem";
import { DeliverStatus, OrderInfo, OrderItemInfo, PaymentStatus } from './type';
import generateOrderCode from '../../heplers/generateOrderCode';
import { BadRequestErr } from '../../exception/BadRequestError';
import ErrorCode from '../../utils/ErrorCode';
import productService from '../product/product.service';
import { Order } from '../../databases/mysql/entities/Order';

class OrderService {

    async createOrder({ userId, shippingAddress, paymentMethod, currency, totalPrice }: OrderInfo) {
        const orderCode = generateOrderCode();
        const order = Order.create({
            orderCode, userId, shippingAddress, paymentMethod, currency, totalPrice,
            deliverStatus: DeliverStatus.PENDING, createdAt: new Date(), paymentStatus: PaymentStatus.PENDING
        });
        return await order.save();
    }

    async createOrderItem(orderId: string, orderItemsInfo: OrderItemInfo[]) {
        const orderItems = await Promise.all(orderItemsInfo.map(async orderItem => {
            return await OrderItem.create({ ...orderItem, orderId }).save();
        }))
        return orderItems;
    }

    async getOrder(userId: string) {
        return await Order.find({ where: { userId }, order: { createdAt: "DESC" } });
    }

    async calculateOrderTotalPrice(orderItemsInfo: OrderItemInfo[], discount: number) {
        const productPrices = await Promise.all(orderItemsInfo.map(async (item) => {
            const product = await productService.findProductById(item.productId as string);
            if (!product) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Product not found" })
            return Number(product.price) * Number(item.quantity);
        }))
        let totalPrice = productPrices.reduce((price, currentValue) => {
            return price + currentValue
        }, 0)
        totalPrice -= (totalPrice * (discount / 100))
        return totalPrice;
    }

    async updateStripeOrder(orderId: string, paymentStatus: string, paymentId: string) {
        const order = await Order.findOne({ where: { id: orderId } });
        order!.paymentStatus = paymentStatus;
        order!.paymentId = paymentId;
        return await order!.save();
    }

    async getALlOrder(userId: string) {
        return await Order.find({ where: { userId }, order: { createdAt: "DESC" } })
    }
}
export default new OrderService();