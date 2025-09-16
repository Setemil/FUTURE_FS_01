import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AdminOTP from "../model/adminOTP.model.js";
import {transporter} from '../config/mailer.js'

const router = express.Router();

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  //THIS FIRST CHECKS IF THE EMAIL INPUTTED IS THE ADMIN EMAIL
  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //THIS SCRIPT GENERATES THE OTP AND SENDS IT TO THE ADMIN EMAIL
  const otp = crypto.randomInt(100000, 999999).toString();

  //THIS SENDS THE OTP TO THE DATABASE
  await AdminOTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
  });

  try {
    //THIS ACTUALLY SENDS THE OTP TO THE ADMIN EMAIL
    await transporter.sendMail({
      from: `"Portfolio Admin" <${process.env.GOOGLE_SMTP_EMAIL}>`,
      to: email,
      subject: "Your Admin OTP",
      text: `Your OTP is ${otp}. If you (Setemi) didn&apos;t request this, someone might be trying to access your account. Do not share this code.`,
      html: `
    <p>Your OTP is <b>${otp}</b></p>
    <p>If you (Setemi) didn&apos;t request this, someone is trying to hack into your stuff 😅. 
    Sha don't send it to anybody, yktv.</p>
  `,
    });
    res.json({ message: "OTP sent" });

  } catch (error) {
    console.error("Error sending mail:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
})
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const record = await AdminOTP.findOne({ email, otp });
  if (!record) return res.status(400).json({ message: "Invalid OTP" });

  if (record.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  // Generate token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Delete OTP after use
  await AdminOTP.deleteOne({ _id: record._id });

  res.json({ token });
});

export default router
