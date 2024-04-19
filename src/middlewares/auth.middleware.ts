import { Request, NextFunction, Response } from "express";
import Jwt from "../utils/Jwt";
import { UnauthorizedError } from "../exception/unauthorizedError";
import ErrorCode from "../utils/ErrorCode";
import envConfig from "../utils/envConfig";
import { ResponseCustom } from "../utils/expressCustom";
export const authMiddleware = async (
    req: Request,
    _: ResponseCustom,
    next: NextFunction
) => {
    if (!envConfig.isProduction) {
        req.userInfo = { userId: "1", role: "admin" }
        return next();
    }
    const accessToken = req.cookies.atk;
    if (!accessToken) {
        throw new UnauthorizedError({
            errorMessage: "You need to login before",
            errorCode: ErrorCode.UNAUTHORIZED,
        });
    }
    try {
        const payload = Jwt.verifyAccessToken(accessToken);
        req.userInfo = payload;
       return next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new UnauthorizedError({
                errorCode: ErrorCode.TOKEN_EXPIRED,
                errorMessage: "Token was expired",
            });
        }
        throw new UnauthorizedError({
            errorCode: ErrorCode.VERIFY_FAILED,
            errorMessage: "Invalid token",
        });
    }



};
