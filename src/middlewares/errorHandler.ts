import { NextFunction, Request, Response } from "express";
import { ErrorCustom } from "../exception/ErrorCustom";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { ResponseCustom } from "../utils/expressCustom";
import ErrorCode from "../utils/ErrorCode";
import { ALLOW_FORMATS, maxFileSize } from "../utils/constants";

export const errorHandler = (
  err: Error,
  req: Request,
  res: ResponseCustom,
  next: NextFunction
) => {
  console.log(err)
  if ((err as any).type === "entity.parse.failed") {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: `Internal Error 400`,
      errors: {
        errorCode: ErrorCode.INVALID_FORMAT,
        errorMessage: `Syntax body`,
      },
    });
  }
  if (err instanceof ErrorCustom) {
    return res.status(err.statusCode).json({
      message: `Error ${err.statusCode}`,
      errors: err.serializeError(),
    });
  }
  if ((err as any).code === "LIMIT_FILE_SIZE") {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: `Internal Error 400`,
      errors: {
        errorCode: ErrorCode.FAILED_VALIDATE_BODY,
        errorMessage: `File size to large. Max is ${maxFileSize}KB`,
      },
    });
  }
  if (err.message === "Invalid image file") {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: `Internal Error 400`,
      errors: {
        errorCode: ErrorCode.FAILED_VALIDATE_BODY,
        errorMessage: `We only accept ${ALLOW_FORMATS} file`,
      },
    });
  }
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: `Internal Error 500`,
    errors: {
      errorCode: ErrorCode.INTERNAL_ERROR,
      errorMessage: "This error comes from our server, we will provide information soon",
    },
  });
};

export default errorHandler;
