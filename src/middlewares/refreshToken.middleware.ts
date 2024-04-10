import { Request, NextFunction, Response } from "express";
import Jwt from "../utils/Jwt";
import "express-async-errors";
import { UnauthorizedError } from "../exception/unauthorizedError";
import ErrorCode from "../utils/ErrorCode";
export const refreshTokenMiddleware = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const refreshToken = req.cookies.rtk;
    if (!refreshToken) {
        throw new UnauthorizedError({
            errorMessage: "You need to login before",
            errorCode: ErrorCode.UNAUTHORIZED,
        });
    }
    try {
        const payload = Jwt.verifyRefreshToken(refreshToken);
        req.data = payload;
        next();
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
