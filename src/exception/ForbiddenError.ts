import { ErrorDetail } from "../utils/expressCustom";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { ErrorCustom } from "./ErrorCustom";

export class ForbiddenErr extends ErrorCustom {
  statusCode = HttpStatusCode.FORBIDDEN;
  constructor(private error: ErrorDetail) {
    super(error);
    Object.setPrototypeOf(this, ForbiddenErr.prototype);
  }
  serializeError() {
    return {
      errorCode: this.error.errorCode,
      errorMessage: this.error.errorMessage,
    };
  }
}
