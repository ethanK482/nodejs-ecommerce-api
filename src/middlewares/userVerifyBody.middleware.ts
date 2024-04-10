import { checkSchema } from "express-validator";
import { passwordRegex } from "../utils/constants";
const registerMiddleware = checkSchema({
  firstName: {
    notEmpty: true,
    errorMessage: "First name is required"
  },
  lastName: {
    notEmpty: true,
    errorMessage: "Last name is required"
  },
  email: {
    isEmail: { errorMessage: "Please enter an email address" },
    notEmpty: { errorMessage: "Email is required" },
  },

  password: {
    isString: true,
    notEmpty: { errorMessage: "Password is required" },
    matches: {
      options: [passwordRegex],
      errorMessage: 'Password must include at least eight characters, at least one uppercase letter, one lowercase letter and one number',
    },

  }
});


const loginMiddleware = checkSchema({

  email: {
    isEmail: { errorMessage: "Please enter an email address" },
  },
  password: {
    notEmpty: { errorMessage: "Password is required" },
  },

});


const GetResetTokenMiddleWare = checkSchema({

  email: {
    isEmail: { errorMessage: "Please enter an email address" },
    notEmpty: { errorMessage: "Email is required" },
  },

});


const resetPasswordMiddleware = checkSchema({
  encryptEmail: {
    notEmpty: { errorMessage: "Invalid verification" },
  },
  newPassword: {
    notEmpty: { errorMessage: "Password is required" },
    matches: {
      options: [passwordRegex],
      errorMessage: 'Password must include at least eight characters, at least one uppercase letter, one lowercase letter and one number',
    },
  }
});

const GetVerifyEmailTokenMiddleWare = checkSchema({
  verifyEmailToken: {
    notEmpty: { errorMessage: "Verify Email Token is required" },
  }

});

export { registerMiddleware, loginMiddleware, GetResetTokenMiddleWare, resetPasswordMiddleware, GetVerifyEmailTokenMiddleWare }
