import 'express-async-errors';
import { CouponDTO } from './type';
import { Coupon } from '../../databases/mysql/entities/Coupon';
import { BadRequestErr } from '../../exception/BadRequestError';
import ErrorCode from '../../utils/ErrorCode';
class CouponService {
    async createCoupon(coupon: CouponDTO) {
        const { userId, code, startDate, endDate, discount } = coupon;
        const newCoupon = Coupon.create({ userId, code, discount, startDate, endDate })
        return await newCoupon.save();
    }

    async editCoupon(coupon: CouponDTO, couponId: string) {
        const { code, startDate, endDate, discount } = coupon;
        let couponExist = await this.findCouponById(couponId);
        if (!couponExist) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Coupon not found" });
        couponExist.code = code;
        couponExist.startDate = startDate;
        couponExist.endDate = endDate;
        couponExist.discount = discount;
        return await couponExist.save();
    }

    deleteCoupon(couponId: string) {
        Coupon.createQueryBuilder().delete().where("id = :couponId", { couponId }).execute();
    }
    async findCouponByCode(code: string) {
        return await Coupon.findOne({ where: { code } })
    }

    async findCouponById(id: string) {
        return await Coupon.findOne({ where: { id } })
    }

    async finAllCoupon(){
        return await Coupon.find({order: { startDate: "DESC"}})
    }
}
export default new CouponService();