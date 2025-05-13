import nodemailer from "nodemailer";
import { env } from "../env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const url = `${env.CLIENT_URL}/verify?token=${token}`;
  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: "Verify your Noctis account",
    html: `<p>Welcome to <b>Noctis</b>! Confirm your email:<br/><a href="${url}">Verify account</a></p>`
  });
};
