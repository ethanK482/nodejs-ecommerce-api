import { NextFunction, Request } from 'express';
import 'express-async-errors';
import { ResponseCustom } from '../../utils/expressCustom';
import { OrderErrorCode, PaymentMethod } from './type';
import { BadRequestErr } from '../../exception/BadRequestError';
import orderService from './order.service';
import { HttpStatusCode } from '../../utils/httpStatusCode';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../../exception/RequestValidationError';
import stripeService from '../stripe/stripe.service';
import ErrorCode from '../../utils/ErrorCode';
import { isAfter } from 'date-fns';
import couponService from '../coupon/coupon.service';
import envConfig from '../../utils/envConfig';
class OrderController {
    async createOrder(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
            const { ordersItem, shippingAddress, paymentMethod, currency, couponCode, successUrl, cancelUrl } = request.body;
            const { userId } = request.userInfo;
            let discount = 0;
            if (couponCode) {
                const coupon = await couponService.findCouponByCode(couponCode);
                if (!coupon) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Coupon not found" });
                if (isAfter(new Date(coupon.startDate), new Date())) throw new BadRequestErr({ errorCode: ErrorCode.VERIFY_FAILED, errorMessage: "Coupon have not active yet " });
                if (isAfter(new Date(), new Date(coupon.endDate))) throw new BadRequestErr({ errorCode: ErrorCode.VERIFY_FAILED, errorMessage: "Coupon expired " });
                discount = Number(coupon.discount)
            }
            const totalPrice = await orderService.calculateOrderTotalPrice(ordersItem, discount);
            switch ((paymentMethod as string).toLowerCase()) {
                case PaymentMethod.CASH: {
                    const order = await orderService.createOrder({ userId, shippingAddress, paymentMethod: PaymentMethod.CASH, currency, totalPrice });
                    const orderItems = orderService.createOrderItem(order.id, ordersItem);
                    return response.status(HttpStatusCode.OK).json({ message: "Order successfully", data: { order: { ...order, orderItems } } });
                }
                case PaymentMethod.ONLINE: {
                    if (!successUrl || !cancelUrl) {
                        throw new BadRequestErr({ errorCode: ErrorCode.FAILED_VALIDATE_BODY, errorMessage: "You need provide bot successUrl and cancelUrl" })
                    }
                    const order = await orderService.createOrder({ userId, shippingAddress, paymentMethod: PaymentMethod.ONLINE, currency, totalPrice })
                    const orderItems = orderService.createOrderItem(order.id, ordersItem);

                    const url = await stripeService.createPayment(ordersItem, order.id, successUrl, cancelUrl, discount, currency);
                    return response.status(HttpStatusCode.OK).json({ message: "Order successfully", data: { order: { ...order, orderItems }, url } });
                }
                default: {
                    throw new BadRequestErr({ errorCode: OrderErrorCode.INVALID_PAYMENT_METHOD, errorMessage: "Invalid payment method" })
                }
            }

        } catch (error) {
            next(error);
        }
    }

    async getAllOrder(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const { userId } =  request.userInfo;
            const orders = await orderService.getALlOrder(userId);
            return response.status(HttpStatusCode.OK).json({ message: "Fetch order successfully", data: { orders } });
        } catch (error) {
            next(error)
        }
    }

}
export default new OrderController();