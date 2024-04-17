import { Request, NextFunction, Response } from "express";
import ErrorCode from "../utils/ErrorCode";
import { ForbiddenErr } from "../exception/ForbiddenError";
import { ResponseCustom } from "../utils/expressCustom";
export const adminMiddleware = async (
  req: Request,
  _: ResponseCustom,
  next: NextFunction
) => {
  if (req.userInfo.role === "admin") {
    return next();
  }
  throw new ForbiddenErr({ errorCode: ErrorCode.ADMIN_ISNT, errorMessage: "Permission Error" })

};
