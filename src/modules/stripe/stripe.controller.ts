import { NextFunction, Request } from "express";
import envConfig from "../../utils/envConfig";
import { ResponseCustom } from "../../utils/expressCustom";
import orderService from "../order/order.service";
import stripeService from "./stripe.service";

class StripeController{
    async listenEvent(request: Request, response: ResponseCustom, next: NextFunction) {
        const endpointSecret = envConfig.getStripeEndPointSecret;
        const stripe = stripeService.stripe;
        const sig = request.headers['stripe-signature'] as string | string[] | Buffer;
        let event;
        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;
                const order_id = (session.metadata as { order_id: string }).order_id;
                const paymentStatus = session.payment_status;
                orderService.updateStripeOrder(JSON.parse(order_id), paymentStatus, event.id)
                return response.send();
            }
            return;
        } catch (error) {
            next(error)
        }
    }

}
export default new StripeController();