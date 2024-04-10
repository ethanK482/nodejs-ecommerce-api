import { ErrorDetail } from "../utils/expressCustom";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { ErrorCustom } from "./ErrorCustom";

export class UnauthorizedError extends ErrorCustom {
  statusCode = HttpStatusCode.UNAUTHORIZED;
  constructor(private error: ErrorDetail) {
    super(error);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serializeError() {
    return {
      errorCode: this.error.errorCode,
      errorMessage: this.error.errorMessage,
    };
  }
}
