export interface OrderItemInfo {
    productId: string;
    quantity: number;
}
export interface OrderInfo {
    userId:string;
    shippingAddress:string;
    paymentMethod: string;
    currency:string;
    totalPrice: number
}
export enum PaymentMethod {
    CASH = "cash",
    ONLINE = "online"
}
export const enum PaymentStatus{
    PENDING="pending",
    PAID="paid",
    FAILED="failed"
}
export const enum CurrencyAccept{
    USD="usd",
    VND="vnd"
}
export const enum DeliverStatus{
    PENDING="wait for confirm",
    CONFIRMED="confirmed",
    DELIVERING="delivering",
    DELIVERED="delivered"
}
export enum OrderErrorCode{
    INVALID_PAYMENT_METHOD=20004
}




