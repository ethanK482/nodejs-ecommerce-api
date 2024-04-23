import { Router } from "express";
import userController from "./user.controller";
import { forgotPasswordMiddleWare, loginMiddleware, registerMiddleware, resetPasswordMiddleware } from "../../middlewares/userBody.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { refreshTokenMiddleware } from "../../middlewares/refreshToken.middleware";

const userRouter = Router();
userRouter.post('/register', registerMiddleware, userController.register);// register user
userRouter.get('/verify/:encryptEmail', userController.verifyEmail);// verify email user
userRouter.post('/verify-request', userController.verifyEmailLink); // request to get verify email
userRouter.post('/login', loginMiddleware, userController.login);// register user
userRouter.get('/logout',authMiddleware , userController.logout);// register user
userRouter.get('/profile', authMiddleware, userController.userProfile);
userRouter.get('/forgot-password',forgotPasswordMiddleWare,  userController.forgotPassword);
userRouter.post('/reset-password', resetPasswordMiddleware,  userController.resetPassword);
userRouter.get('/refresh-token', refreshTokenMiddleware,  userController.refreshToken);
userRouter.post('/change-password', authMiddleware,  userController.changePassword);



export default userRouter;