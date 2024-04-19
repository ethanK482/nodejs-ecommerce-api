export interface CouponDTO {
    userId: string;
    code: string;
    startDate: Date;
    endDate: Date;
    discount: number
}