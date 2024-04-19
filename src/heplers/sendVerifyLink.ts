import Jwt from "../utils/Jwt";
import envConfig from "../utils/envConfig";
import { ResponseCustom } from "../utils/expressCustom";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { sendEmail } from "../utils/mail";
import generateVerifyForm from "./generateVerifyForm";
const getSendMaiInfo = (purpose: string, email: string, clientLink?: string) => {
    const params = encodeURIComponent(Jwt.generateVerifyEmailToken(email))
    switch (purpose) {
        case "verify": {
            const verifyLink = `http://${envConfig.getHost}:${envConfig.portServer}/api/user/verify/${params}`;
            return { verifyLink, action: "Verify Email" }
        }
        case "resetPassword": {
            const verifyLink = `${clientLink}/${params}`;
            return { verifyLink, action: "Reset password" }
        }
        default: return {};

    }
}

const sendVerifyLink = (response: ResponseCustom, email: string, purpose: string, clientLink?: string) => {
    const { verifyLink, action } = getSendMaiInfo(purpose, email, clientLink);
    sendEmail({ email, subject: action as string, html: generateVerifyForm(action as string, verifyLink as string) })
    return response.status(HttpStatusCode.OK).json({
        message: `Please check ${email} to ${action}`,
    })
}
export default sendVerifyLink;