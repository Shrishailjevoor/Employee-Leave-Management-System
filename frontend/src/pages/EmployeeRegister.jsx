import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function EmployeeRegister() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  // ============================================================
  // Handle Employee Registration
  // ============================================================
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/auth/register", {
        username,
        password,
      });

      toast.success("Registration Successful. Please Login.");

      navigate("/login/employee");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center px-4 sm:px-6 py-8">

      {/* ========================================================
          Registration Card
      ======================================================== */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[430px] p-6 sm:p-8">

        {/* Back to Login */}
        <Link
          to="/login/employee"
          className="flex items-center gap-2 text-blue-600 text-base sm:text-lg mb-6"
        >
          <ArrowLeft size={20} />
          Back to Login
        </Link>


        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 leading-tight">
          Employee Registration
        </h1>


        {/* Registration Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5 mt-8"
        >

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-xl p-3 sm:p-4 text-base sm:text-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />


          {/* Password */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-xl p-3 sm:p-4 pr-12 text-base sm:text-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Password Visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}
            </button>

          </div>


          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}