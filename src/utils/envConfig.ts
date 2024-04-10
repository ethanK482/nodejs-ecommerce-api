import dotenv from "dotenv";
dotenv.config();

class ENVConfig {
  get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  }
  get isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  }
  get getHost(): string {
    return process.env.HOST!;
  }
  get portServer(): number {
    return Number(process.env.PORT)!;
  }
  get getDbUserName(): string {
    return process.env.DB_USER_NAME!;
  }
  get getDbPassword(): string {
    return process.env.DB_PASSWORD!;
  }
  get getDbPort(): number {
    return Number(process.env.DB_PORT!)
  }
  get getDbName(): string {
    return process.env.DB_NAME!;
  }
  get getEncryptSecret(): string {
    return process.env.ENCRYPT_SECRET_KEY!;
  }
  get getMailAccount(): string {
    return process.env.SEND_MAIL_ACCOUNT!;
  }
  get getMailPassword(): string {
    return process.env.SEND_MAIL_PASSWORD!;
  }
  get getJwtSecretKey(): string {
    return process.env.JWT_SECRET_KEY!;
  }

  get getJwtRefreshSecretKey(): string {
    return process.env.JWT_REFRESH_SECRET_KEY!;
  }



  // get JWTRefreshSecretKey(): string {
  //   return process.env.JWT_SECRET_REFRESH_KEY!;
  // }
  // get getAccessTokenExpireTime(): string {
  //   return process.env.EXPIRE_ACCESS_IN!
  // }
  // get getRefreshTokenExpireTime(): string {
  //   return process.env.EXPIRE_REFRESH_IN!
  // }



}
export default new ENVConfig();
