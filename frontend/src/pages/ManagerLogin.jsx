import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
export default function ManagerLogin() {

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password
      });

      if (res.data.user.role !== "manager") {

  toast.error("Please login from the Employee Portal.");

  setLoading(false);

  return;

}

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

navigate("/manager");
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

    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl w-[430px] p-8">

        <Link
          to="/"
          className="flex items-center gap-2 text-green-600 mb-5"
        >
          <ArrowLeft size={20}/>
          Back
        </Link>

        <h1 className="text-3xl font-bold text-center text-green-700">
          Manager Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome Manager
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-xl p-3"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-xl p-3"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>

          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  );

}