import { Request, NextFunction, Response } from "express";
import Jwt from "../utils/Jwt";
import "express-async-errors";
import { UnauthorizedError } from "../exception/unauthorizedError";
import ErrorCode from "../utils/ErrorCode";
export const authMiddleware = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
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
