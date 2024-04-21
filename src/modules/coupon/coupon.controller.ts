import 'express-async-errors';
import { ResponseCustom } from '../../utils/expressCustom';
import { Request, NextFunction } from 'express';
import couponService from './coupon.service';
import { BadRequestErr } from '../../exception/BadRequestError';
import ErrorCode from '../../utils/ErrorCode';
import { HttpStatusCode } from '../../utils/httpStatusCode';
import { CouponDTO } from './type';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../../exception/RequestValidationError';
class CouponController {
    async createCoupon(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
            const { userId } = request.userInfo;
            const { code, startDate, endDate, discount } = request.body;
            const couponExist = await couponService.findCouponByCode(code);
            if (couponExist) throw new BadRequestErr({ errorCode: ErrorCode.EXIST, errorMessage: "Duplicate coupon code" });
            const coupon = await couponService.createCoupon({ code, startDate, endDate, discount, userId })
            return response.status(HttpStatusCode.CREATED).json({ message: "Create coupon successfully", data: { coupon } })
        } catch (error) {
            next(error);
        }

    }

    async editCoupon(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
            const { code, startDate, endDate, discount } = request.body;
            const { couponId } = request.params;
            const couponExist = await couponService.findCouponByCode(code);
            if (couponExist) throw new BadRequestErr({ errorCode: ErrorCode.EXIST, errorMessage: "Duplicate coupon code" });
            const editedCoupon = await couponService.editCoupon({ code, startDate, endDate, discount } as CouponDTO, couponId);
            return response.status(HttpStatusCode.OK).json({ message: "Edit coupon successfully", data: { editedCoupon } });

        } catch (error) {
            next(error)
        }

    }

    async deleteCoupon(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const { couponId } = request.params;
            let couponExist = await couponService.findCouponById(couponId);
            if (!couponExist) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "Coupon not found" });
            couponService.deleteCoupon(couponId);
            return response.status(HttpStatusCode.OK).json({ message: "Delete coupon successfully" })
        } catch (error) {
            next(error)
        }

    }

    async getAllCoupon(request: Request, response: ResponseCustom, next: NextFunction) {
        try {
            const coupons = await couponService.finAllCoupon();
            return response.status(HttpStatusCode.OK).json({ message: "Fetch coupon successfully", data: { coupons } })
        } catch (error) {
            next(error)
        }
    }
}
export default new CouponController();