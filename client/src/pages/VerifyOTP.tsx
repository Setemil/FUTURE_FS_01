import OtpInput from "react-otp-input";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/admin/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        throw new Error("Invalid OTP geng");
      }

      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (error: any) {
      if (error && error.message) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-[700px] bg-black flex items-center justify-center p-6 space-y-8">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-white text-3xl font-bold tracking-tight">
              Verify Your Code
            </h1>
            <p className="text-gray-400 text-sm">
              Enter the 6-digit code sent to your device
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="otp"
                className="text-gray-300 text-sm font-medium block"
              >
                Verification Code
              </label>
              <div className="flex flex-col items-center gap-4">
                <OtpInput
                  value={otp}
                  onChange={setValue}
                  numInputs={6}
                  isInputNum
                  inputStyle="w-12 h-12 text-xl font-semibold text-center border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-800 text-white transition-all duration-200 hover:border-gray-600"
                  containerStyle="flex gap-3"
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Verify Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
