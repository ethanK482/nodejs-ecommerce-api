import { NextFunction, Response, Request } from "express";
import "express-async-errors";
import AuthErrorCode from "../utils/ErrorCode";
import { ForbiddenErr } from "../exception/ForbiddenError";
export const adminMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  console.log(req.userInfo);
  if (req.userInfo?.role == "admin") next();
  else {
    throw new ForbiddenErr({
      errorMessage: "You do not have sufficient rights to access here",
      errorCode: AuthErrorCode.FORBIDDEN_ERROR,
    });
  }
};
