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

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post("/auth/login", {

        username,
        password

      });

     if (res.data.user.role !== "employee") {

  toast.error("Please login from the Manager Portal.");

  setLoading(false);

  return;

}

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

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

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl w-[430px] p-8">

        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 mb-5"
        >
          <ArrowLeft size={20}/>
          Back
        </Link>

        <h1 className="text-3xl font-bold text-center text-blue-700">

          Employee Login

        </h1>

        <p className="text-center text-gray-500 mt-2">

          Welcome Back

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

              type={showPassword ? "text":"password"}

              placeholder="Password"

              className="w-full border rounded-xl p-3"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />

            <button

              type="button"

              onClick={()=>setShowPassword(!showPassword)}

              className="absolute right-4 top-4"

            >

              {

                showPassword

                ?

                <EyeOff size={20}/>

                :

                <Eye size={20}/>

              }

            </button>

          </div>

          <button

            disabled={loading}

            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"

          >

            {

              loading

              ?

              "Logging In..."

              :

              "Login"

            }

          </button>
                <div className="text-center mt-6">

  <p className="text-gray-600">

    Don't have an account?

  </p>

  <Link
    to="/register/employee"
    className="text-blue-600 font-semibold hover:underline"
  >
    Register Here
  </Link>

</div>
        </form>

      </div>

    </div>

  );

}