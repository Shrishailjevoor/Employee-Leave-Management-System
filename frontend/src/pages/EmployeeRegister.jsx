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

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl w-[430px] p-8">

        <Link
          to="/login/employee"
          className="flex items-center gap-2 text-blue-600 mb-5"
        >
          <ArrowLeft size={20} />
          Back to Login
        </Link>


        <h1 className="text-3xl font-bold text-center text-blue-700">
          Employee Registration
        </h1>


        <form
          onSubmit={handleRegister}
          className="space-y-5 mt-8"
        >

          {/* Username */}

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-xl p-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />


          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-xl p-3 pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>


          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
          >

            {loading
              ? "Creating Account..."
              : "Register"}

          </button>

        </form>

      </div>

    </div>

  );

}