import { User } from "../../databases/mysql/entities/User";
import { BadRequestErr } from "../../exception/BadRequestError";
import { UnauthorizedError } from "../../exception/unauthorizedError";
import ErrorCode from "../../utils/ErrorCode";
import Jwt from "../../utils/Jwt";
import hashing from "../../utils/hashing";

class UserService {
  async register(firstName: string, lastName: string, email: string, password: string) {
    // create a user with default role is "user";
    const newUser = User.create({ firstName, lastName, email, password, role: 'user' });
    return await newUser.save();
  }
  async login(email: string, password: string) {

    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestErr({
        errorCode: ErrorCode.NOT_FOUND,
        errorMessage: "Not found user with this email"
      })
    }
    if (!user.isVerifyEmail) {
      throw new BadRequestErr({
        errorCode: ErrorCode.VERIFY_EMAIL_NEED,
        errorMessage: "You need to verify email"
      })
    }

    const isCorrectPassword = await hashing.comparePassword(password, user.password);
    if (!isCorrectPassword) throw new UnauthorizedError({ errorCode: ErrorCode.INCORRECT, errorMessage: "Incorrect password" })
    const accessToken = Jwt.generateAccessToken(user.id, user.role);
    const refreshToken = Jwt.generateRefreshToken(user.id);
    await user.save();
    return { accessToken, refreshToken }
  }



  async findUserById(id: string) {
    return await User.findOne({ where: { id } })
  }

  async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } })
  }

  async changePassword(email: string, password: string) {
    const hashedPassword = await hashing.hashPassword(password);
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestErr({
        errorCode: ErrorCode.NOT_FOUND,
        errorMessage: "Not found user"
      })
    }
    user.password = hashedPassword;
    user.save();
  }
}
export default new UserService();
