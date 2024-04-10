import { NextFunction, Request, Response } from "express";
import { ErrorCustom } from "../exception/ErrorCustom";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { ResponseCustom } from "../utils/expressCustom";
import ErrorCode from "../utils/ErrorCode";

export const errorHandler = (
  err: Error,
  req: Request,
  res: ResponseCustom,
  next: NextFunction
) => {
  if (err instanceof ErrorCustom) {
    console.log(err);
    return res.status(err.statusCode).json({
      message: `Error ${err.statusCode}`,
      errors: err.serializeError(),
    });
  }
  console.log(err);
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: `Internal Error 500`,
    errors: {
      errorCode: ErrorCode.INTERNAL_ERROR,
      errorMessage: "This error comes from our server, we will provide information soon",
    },
  });
};

export default errorHandler;
