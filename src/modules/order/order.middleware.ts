import { checkSchema } from "express-validator";
import { CurrencyAccept, OrderItemInfo, PaymentMethod } from "./type";

class OrderMiddleware {

    createOrder = checkSchema({
        ordersItem: {
            notEmpty: {
                errorMessage: 'ordersItem is required'
            },
            isArray: {
                errorMessage: 'ordersItem must be an array'
            },
            custom: {
                options: (orderItemsInfo: OrderItemInfo[]) => {
                    return orderItemsInfo.every(item => {
                        return typeof Number(item.productId) === 'number' &&
                            typeof Number(item.quantity) === 'number' &&
                            Number(item.quantity) > 0;
                    });
                },
                errorMessage: 'Each item in ordersItem must be an object with a productId (string) and quantity (number).'
            }
        },
        shippingAddress: {
            notEmpty: { errorMessage: 'shippingAddress is required' }
        },
        paymentMethod: {
            notEmpty: { errorMessage: 'paymentMethod is required' },
            custom: {
                options: (paymentMethod) => {
                    return [PaymentMethod.CASH, PaymentMethod.ONLINE].includes(paymentMethod)
                },
                errorMessage: `Payment method should be  ${PaymentMethod.CASH} or ${PaymentMethod.ONLINE}`
            }
        },
        currency: {
            notEmpty: { errorMessage: 'currency is required' },
            custom: {
                options: (paymentMethod) => {
                    return [CurrencyAccept.VND, CurrencyAccept.USD].includes(paymentMethod)
                },
                errorMessage: `We accept ${CurrencyAccept.VND} and ${CurrencyAccept.USD}`
            }
        }
    });


}
export default new OrderMiddleware();