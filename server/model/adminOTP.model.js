import mongoose from "mongoose";

const adminOTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "5m" },
});

const AdminOTP = mongoose.model("AdminOTP", adminOTPSchema);

export default AdminOTP;
