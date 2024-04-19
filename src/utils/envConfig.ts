import dotenv from "dotenv";
dotenv.config();

class ENVConfig {
  get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
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
  get getCloudinaryName(): string{
    return process.env.CLOUDINARY_NAME!;
  }
  get getCloudinaryKey(): string{
    return process.env.CLOUDINARY_KEY!;
  }

  get getCloudinarySecret(): string{
    return process.env.CLOUDINARY_SECRET!;
  }


}
export default new ENVConfig();
