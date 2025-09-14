import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestOTP = () => {
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/admin/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send OTP");
      }
      const data = await res.json();
      navigate("/admin/verify", {state: {email}});
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 space-y-8">
      <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Welcome to the Dark Side
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <header className="text-green-400 text-lg font-semibold">
            Enter The Almighty Admin Email
          </header>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-gray-300 text-sm font-medium block"
            >
              Admin Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOTP;
