import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function EmployeeRegister() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <ArrowLeft size={20}/>
          Back to Login
        </Link>

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Employee Registration
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5 mt-8"
        >

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-xl p-3"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-3"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

      </div>

    </div>

  );

}