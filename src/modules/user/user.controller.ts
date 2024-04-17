
import { NextFunction, Request } from "express";
import ErrorCode from "../../utils/ErrorCode";
import { ResponseCustom } from "../../utils/expressCustom";
import hashing from "../../utils/hashing";
import userService from "./user.service";
import "express-async-error"
import { BadRequestErr } from "../../exception/BadRequestError";
import sendVerifyLink from "../../heplers/sendVerifyLink";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../../exception/RequestValidationError";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import Jwt from "../../utils/Jwt";
class UserController {
  /*
    public
    register user - 
  */
  async register(request: Request, response: ResponseCustom, next: NextFunction
  ) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
      const { firstName, lastName, email, password } = request.body; // get register info from body.
      const userExist = await userService.findUserByEmail(email); // check email has been registered throw error 
      if (userExist) {
        throw new BadRequestErr({
          errorCode: ErrorCode.EXIST,
          errorMessage: "Email has been registered"
        })
      }
      const hashedPassword = await hashing.hashPassword(password); // hash password, don't save plaintext to database.
      const user = await userService.register(firstName, lastName, email, hashedPassword);
      sendVerifyLink(response, user.email, "verify") // send mail to verify email.
    } catch (error) {
      next(error)
    }
  }

  /*
    public
    verify email
 */
  async verifyEmail(request: Request, response: ResponseCustom, next: NextFunction) {
    const { encryptEmail } = request.params;
    let errorMessage = "";
    try {
      if (!encryptEmail) {
        throw new BadRequestErr({
          errorCode: ErrorCode.FAILED_VALIDATE_BODY,
          errorMessage: "Invalid verification"
        })
      }
      const token = decodeURIComponent(encryptEmail);
      const { email } = Jwt.verifyEmailToken(token);
      const userExist = await userService.findUserByEmail(email);
      if (!userExist) {
        errorMessage = "Verify failed please try later";
        throw new BadRequestErr({
          errorCode: ErrorCode.NOT_FOUND,
          errorMessage: "Not found user"
        })
      }
      userExist.isVerifyEmail = 1;
      await userExist.save();
      response.redirect('https://github.com/')
    } catch (error: any) {
      if (error.name === "TokenExpiredError") errorMessage = "Verify token is expired"
      response.redirect(`https://google.com/?message=${errorMessage}`)// send to verify error page.
    }
  }
  /*
    public
    request to get verify email.
  */
  async verifyEmailLink(request: Request, response: ResponseCustom, next: NextFunction) {
    const { email } = request.body;
    try {
      if (!email) {
        throw new BadRequestErr({
          errorCode: ErrorCode.FAILED_VALIDATE_BODY,
          errorMessage: "Email is require"
        })
      }
      const userExist = await userService.findUserByEmail(email);
      if (!userExist) {
        throw new BadRequestErr({
          errorCode: ErrorCode.NOT_FOUND,
          errorMessage: "Not found user"
        })
      }
      sendVerifyLink(response, email, "verify")
    } catch (error) {
      next(error)
    }

  }

  async login(request: Request, response: ResponseCustom, next: NextFunction) {
    try {
      const { email, password } = request.body;
      const error = validationResult(request);
      if (!error.isEmpty()) throw new RequestValidationError(error.array())
      const { accessToken, refreshToken } = await userService.login(email, password);
      response.cookie('atk', accessToken);
      response.cookie('rtk', refreshToken);
      return response.status(HttpStatusCode.OK).json({ message: "Login successfully" })
    } catch (error) {
      next(error)
    }
  }
  async logout(request: Request, response: ResponseCustom, next: NextFunction) {
    try {
      response.clearCookie("atk");
      response.clearCookie("rtk");
      return response.status(HttpStatusCode.OK).json({ message: "Logout successfully" })
    } catch (error) {
      next(error)
    }
  }
  async userProfile(request: Request, response: ResponseCustom, next: NextFunction) {
    const { userId } = request.userInfo;
    try {
      const user = await userService.findUserById(userId);
      if (!user) throw new BadRequestErr({ errorCode: ErrorCode.NOT_FOUND, errorMessage: "User not found" })
      const { email, firstName, lastName, role } = user
      const userProfile = { email, firstName, lastName, role }
      return response.status(HttpStatusCode.OK).json({ message: "Successfully", data: { userProfile } })
    } catch (error) {
      next(error)
    }
  }

  async forgotPassword(request: Request, response: ResponseCustom, next: NextFunction) {

    try {
      const error = validationResult(request);
      if (!error.isEmpty()) throw new RequestValidationError(error.array())
      const { email, clientLink } = request.body;
      const userExist = await userService.findUserByEmail(email);
      if (!userExist) {
        throw new BadRequestErr({
          errorCode: ErrorCode.NOT_FOUND,
          errorMessage: "Not found user"
        })
      }
      sendVerifyLink(response, email, "resetPassword", clientLink)
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(request: Request, response: ResponseCustom, next: NextFunction) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
      const { newPassword, encryptEmail } = request.body;
      const token = decodeURIComponent(encryptEmail);
      const { email } = Jwt.verifyEmailToken(token);
      userService.changePassword(email, newPassword);
      return response.status(HttpStatusCode.OK).json({
        message: "Change password successfully"
      })
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return response.status(HttpStatusCode.BAD_REQUEST).json({
          message: `error ${HttpStatusCode.BAD_REQUEST}`,
          errors: {
            errorCode: ErrorCode.TOKEN_EXPIRED,
            errorMessage: "Your token is expired",
          },
        })
      }
      next(error)
    }
  }

  async refreshToken(request: Request, response: ResponseCustom, next: NextFunction) {
    const { userId } = request.data;
    try {
      const userExist = await userService.findUserById(userId);
      if (!userExist) {
        throw new BadRequestErr({
          errorCode: ErrorCode.NOT_FOUND,
          errorMessage: "Not found user"
        })
      }
      const accessToken = Jwt.generateAccessToken(userExist.id, userExist.role);
      response.cookie('atk', accessToken);
      return response.status(HttpStatusCode.OK).json({ message: "Refresh token successfully" })
    } catch (error) {
      next(error)
    }

  }

  async changePassword(request: Request, response: ResponseCustom, next: NextFunction) {
    try {
      const { newPassword } = request.body;
      const { userId } = request.userInfo;
      if (!newPassword) {
        throw new BadRequestErr({
          errorCode: ErrorCode.FAILED_VALIDATE_BODY,
          errorMessage: "New password is require"
        })
      }
      const userExist = await userService.findUserById(userId);
      if (!userExist) {
        throw new BadRequestErr({
          errorCode: ErrorCode.NOT_FOUND,
          errorMessage: "Not found user"
        })
      }
      userService.changePassword(userExist.email, newPassword);
      return response.status(HttpStatusCode.OK).json({ message: "Change password successfully" })
    } catch (error) {
      next(error)
    }
  }
}
export default new UserController();