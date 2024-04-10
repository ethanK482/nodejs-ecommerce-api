import nodemailer from "nodemailer";
import envConfig from "./envConfig";
export type emailOptions = {
  email: string;
  subject: string;
  html: string;
};
export const sendEmail = (option: emailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    auth: {
      user: envConfig.getMailAccount,
      pass: envConfig.getMailPassword,
    },
  });
  const mailOptions = {
    from: envConfig.getMailAccount,
    to: option.email,
    subject: option.subject,
    html: option.html,
  };
  transporter.sendMail(mailOptions);
};
