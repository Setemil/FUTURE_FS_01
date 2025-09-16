import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_SMTP_EMAIL,
    pass: process.env.GOOGLE_SMTP_PASSWORD,
  },
});
