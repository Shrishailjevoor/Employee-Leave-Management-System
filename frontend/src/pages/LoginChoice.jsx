import { User, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-6 sm:px-8 py-10">

      {/* =====================================================
          Page Heading
      ===================================================== */}
      <div className="w-full max-w-6xl text-center">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight">
          Employee Leave Management System
        </h1>

        <p className="mt-3 sm:mt-4 text-gray-600 text-base sm:text-lg">
          Select your portal to continue
        </p>


        {/* ===================================================
            Portal Cards

            Mobile:
            - One column
            - Space around cards
            - Cards do not touch screen edges

            Desktop:
            - Two columns
            - Existing card width maintained
        =================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mt-10 sm:mt-12 md:mt-14 justify-items-center">

          {/* =================================================
              Employee Card
          ================================================= */}
          <div
            onClick={() => navigate("/login/employee")}
            className="
              bg-white
              rounded-3xl
              shadow-2xl
              hover:shadow-blue-300
              transition-all
              duration-300
              md:hover:scale-105
              w-full
              max-w-sm
              cursor-pointer
              overflow-hidden
            "
          >

            {/* Blue Top Border */}
            <div className="bg-blue-600 h-2"></div>

            <div className="p-6 sm:p-8">

              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">

                <User
                  size={36}
                  className="text-blue-600 sm:hidden"
                />

                <User
                  size={42}
                  className="text-blue-600 hidden sm:block"
                />

              </div>


              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-center mt-5 sm:mt-6">
                Employee Portal
              </h2>


              {/* Features */}
              <p className="text-center text-gray-500 mt-4 leading-7 text-sm sm:text-base">
                • Apply Leave
                <br />
                • Track Leave Status
                <br />
                • View Notifications
              </p>


              {/* Continue Button */}
              <button
                type="button"
                className="mt-7 sm:mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Continue
              </button>

            </div>
          </div>


          {/* =================================================
              Manager Card
          ================================================= */}
          <div
            onClick={() => navigate("/login/manager")}
            className="
              bg-white
              rounded-3xl
              shadow-2xl
              hover:shadow-green-300
              transition-all
              duration-300
              md:hover:scale-105
              w-full
              max-w-sm
              cursor-pointer
              overflow-hidden
            "
          >

            {/* Green Top Border */}
            <div className="bg-green-600 h-2"></div>

            <div className="p-6 sm:p-8">

              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">

                <ShieldCheck
                  size={36}
                  className="text-green-600 sm:hidden"
                />

                <ShieldCheck
                  size={42}
                  className="text-green-600 hidden sm:block"
                />

              </div>


              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-center mt-5 sm:mt-6">
                Manager Portal
              </h2>


              {/* Features */}
              <p className="text-center text-gray-500 mt-4 leading-7 text-sm sm:text-base">
                • View Leave Requests
                <br />
                • Approve / Reject Leaves
                <br />
                • Manage Employees
              </p>


              {/* Continue Button */}
              <button
                type="button"
                className="mt-7 sm:mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Continue
              </button>

            </div>
          </div>

        </div>


        {/* ===================================================
            Footer
        =================================================== */}
        <p className="mt-10 sm:mt-12 text-xs sm:text-sm text-gray-500">
          © 2026 Employee Leave Management System
        </p>

      </div>

    </div>
  );
}