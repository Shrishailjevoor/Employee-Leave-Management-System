import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import api from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function EmployeeLogin() {

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  // ============================================================
  // Handle Employee Login
  // ============================================================
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password,
      });


      // ========================================================
      // Make Sure User Is an Employee
      // ========================================================
      if (res.data.user.role !== "employee") {

        toast.error("Please login from the Manager Portal.");

        setLoading(false);

        return;
      }


      // ========================================================
      // Store Authentication Information
      // ========================================================
      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);


      // ========================================================
      // Navigate to Employee Dashboard
      // ========================================================
      navigate("/employee");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center px-4 sm:px-6 py-8">

      {/* ======================================================
          Login Card
          
          Mobile:
          - Space on both sides
          - Smaller padding

          Desktop:
          - Maximum width 430px
          - Existing card appearance preserved
      ====================================================== */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[430px] p-6 sm:p-8">


        {/* ====================================================
            Back Button
        ==================================================== */}
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 text-base sm:text-lg mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </Link>


        {/* ====================================================
            Heading
        ==================================================== */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 leading-tight">
          Employee Login
        </h1>


        {/* Welcome Text */}
        <p className="text-center text-gray-500 mt-2 text-base sm:text-lg">
          Welcome Back
        </p>


        {/* ====================================================
            Login Form
        ==================================================== */}
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
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


            {/* Password Visibility Button */}
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


          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>


          {/* ==================================================
              Registration Link
          ================================================== */}
          <div className="text-center mt-6 text-gray-600 text-sm sm:text-base">

            <p>
              Don't have an account?
            </p>

            <Link
              to="/register/employee"
              className="text-blue-600 font-semibold text-base sm:text-lg hover:underline"
            >
              Register Here
            </Link>

          </div>

        </form>

      </div>

    </div>

  );
}