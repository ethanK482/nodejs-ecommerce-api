import jwt from "jsonwebtoken";
import { userInfo } from "./expressCustom";
import envConfig from "./envConfig";
class JwtHandler {
  generateAccessToken(userId: string, role: string) {
    const accessToken = jwt.sign(
      {
        userId,
        role
      },
      envConfig.getJwtSecretKey,
      { expiresIn: '1h' }
    );

    return accessToken;
  }

  verifyAccessToken(accessToken: string) {
    const payload = jwt.verify(accessToken, envConfig.getJwtSecretKey);
    return payload as userInfo
  }

  generateRefreshToken(userId: string) {
    const refreshToken = jwt.sign(
      {
        userId
      },
      envConfig.getJwtRefreshSecretKey,
      { expiresIn: '30d' }
    );

    return refreshToken;
  }



  verifyRefreshToken(refreshToken: string) {
    const payload = jwt.verify(refreshToken, envConfig.getJwtSecretKey);
    return (payload as { userId: string }).userId;
  }

  generateVerifyEmailToken(email: string) {
    const emailToken = jwt.sign(
      {
        email
      },
      envConfig.getEncryptSecret,
      { expiresIn: '5m' }
    );

    return emailToken;
  }

  verifyEmailToken(emailToken: string) {
    return jwt.verify(emailToken, envConfig.getEncryptSecret) as {email: string};
  }

}
export default new JwtHandler()