import { User, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col items-center justify-center p-6">

      <h1 className="text-5xl font-extrabold text-blue-700">
        Employee Leave Management System
      </h1>

      <p className="mt-4 text-gray-600 text-lg">
        Select your portal to continue
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-14">

        {/* Employee Card */}
        <div
          onClick={() => navigate("/login/employee")}
          className="bg-white rounded-3xl shadow-2xl hover:shadow-blue-300 transition-all duration-300 hover:scale-105 w-96 cursor-pointer overflow-hidden"
        >
          <div className="bg-blue-600 h-2"></div>

          <div className="p-8">

            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <User size={42} className="text-blue-600" />
            </div>

            <h2 className="text-3xl font-bold text-center mt-6">
              Employee Portal
            </h2>

            <p className="text-center text-gray-500 mt-4 leading-7">
              • Apply Leave
              <br />
              • Track Leave Status
              <br />
              • View Notifications
            </p>

            <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
              Continue
            </button>

          </div>
        </div>

        {/* Manager Card */}
        <div
          onClick={() => navigate("/login/manager")}
          className="bg-white rounded-3xl shadow-2xl hover:shadow-green-300 transition-all duration-300 hover:scale-105 w-96 cursor-pointer overflow-hidden"
        >
          <div className="bg-green-600 h-2"></div>

          <div className="p-8">

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck size={42} className="text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-center mt-6">
              Manager Portal
            </h2>

            <p className="text-center text-gray-500 mt-4 leading-7">
              • View Leave Requests
              <br />
              • Approve / Reject Leaves
              <br />
              • Manage Employees
            </p>

            <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
              Continue
            </button>

          </div>
        </div>

      </div>

      <p className="mt-12 text-sm text-gray-500">
        © 2026 Employee Leave Management System
      </p>

    </div>
  );
}