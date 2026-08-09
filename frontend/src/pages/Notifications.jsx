import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);


  // ============================================================
  // Load Notifications When Page Opens
  // ============================================================
  useEffect(() => {
    fetchNotifications();
  }, []);


  // ============================================================
  // Fetch Notification History
  // ============================================================
  const fetchNotifications = async () => {

    try {

      const res = await api.get("/notifications");

      setNotifications(res.data.notifications || []);

    } catch (error) {

      console.error("Notification Error:", error);

    }

  };


  // ============================================================
  // Determine Notification Border Color
  // ============================================================
  const getBorderColor = (message) => {

    const text = message.toLowerCase();

    if (text.includes("approved")) {
      return "border-green-500";
    }

    if (text.includes("rejected")) {
      return "border-red-500";
    }

    return "border-yellow-500";
  };


  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* ======================================================
          Employee Sidebar
      ====================================================== */}
      <Sidebar />


      {/* ======================================================
          Main Content
      ====================================================== */}
      <main className="flex-1 min-w-0 bg-slate-100 min-h-screen p-3 sm:p-5 md:p-8">

        {/* Keep content away from mobile edges */}
        <div className="w-full max-w-5xl mx-auto">

          <Navbar />


          {/* ==================================================
              Page Heading
          ================================================== */}
          <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Notifications
            </h1>

            <p className="text-gray-500 mt-1">
              Notification history
            </p>

          </div>


          {/* ==================================================
              Notification List
          ================================================== */}
          <div className="space-y-4 sm:space-y-5">

            {notifications.length === 0 ? (

              /* =================================================
                 No Notifications
              ================================================= */
              <div className="bg-white rounded-xl shadow p-6 sm:p-10 text-center">

                <div className="text-5xl sm:text-6xl">
                  🔔
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold mt-4">
                  No Notifications
                </h2>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  You don't have any notifications yet.
                </p>

              </div>

            ) : (

              /* =================================================
                 Notification Cards
              ================================================= */
              notifications.map((item) => (

                <div
                  key={item.id}
                  className={`
                    bg-white
                    border-l-4 sm:border-l-8
                    ${getBorderColor(item.message)}
                    rounded-xl
                    shadow
                    p-4 sm:p-5
                    w-full
                  `}
                >

                  {/* Notification Message */}
                  <p className="text-gray-800 text-base sm:text-lg font-medium break-words">
                    {item.message}
                  </p>


                  {/* Notification Date */}
                  <p className="text-gray-400 text-xs sm:text-sm mt-3 break-words">
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </div>

  );
}