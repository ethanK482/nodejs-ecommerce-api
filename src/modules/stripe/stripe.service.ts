import Stripe from "stripe";
import envConfig from "../../utils/envConfig";
import { OrderItemInfo } from "../order/type";
import productService from "../product/product.service";
import { BadRequestErr } from "../../exception/BadRequestError";
import ErrorCode from "../../utils/ErrorCode";
class StripeService {
    stripe = new Stripe(envConfig.getStripeSecretKey);

    async createPayment(orderItemStripe: OrderItemInfo[], orderId: string, clientSuccessUrl: string, clientCancelUrl: string, discount: number, currency: string) {
        const line_items =  await this.mapStripeOrder(orderItemStripe, discount, currency) as Stripe.Checkout.SessionCreateParams.LineItem[] 
        const session = await this.stripe.checkout.sessions.create({
            line_items,
            metadata: {
                order_id: JSON.stringify(orderId),
            },
            mode: "payment",
            success_url: clientSuccessUrl,
            cancel_url: clientCancelUrl
        });
        return session.url;
    }

    async mapStripeOrder(orderItems: OrderItemInfo[], discount: number, currency: string) {
        return  Promise.all(orderItems.map(async (item) => {
            const { productId, quantity } = item;
            const product = await productService.findProductById(productId);
            if (!product) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Product not found" })
            let price = Number(product.price);
            if( discount > 0){
                price -=  (price * discount/100)
            }
            return {
                price_data: {
                    currency,
                    product_data: {
                        name: product.name,
                        description: product.description ?product.description : "A product from hanshop" ,
                    },
                    unit_amount: price * 100,
                },
                quantity
            } ;
        })) 
    }
}
export default new StripeService();