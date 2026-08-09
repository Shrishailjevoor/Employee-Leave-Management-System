import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);


  // ============================================================
  // Format Notification Date & Time in India
  // ============================================================
  const formatIndiaDateTime = (dateString) => {

    if (!dateString) {
      return "-";
    }

    const value = String(dateString);

    const hasTimezone =
      value.endsWith("Z") ||
      /[+-]\d{2}:\d{2}$/.test(value);

    const date = new Date(
      hasTimezone
        ? value
        : `${value}Z`
    );

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };


  // ============================================================
  // Load Notifications
  // ============================================================
  useEffect(() => {
    fetchNotifications();
  }, []);


  // ============================================================
  // Fetch Notifications
  // ============================================================
  const fetchNotifications = async () => {

    try {

      const res =
        await api.get("/notifications");

      setNotifications(
        res.data.notifications || []
      );

    } catch (error) {

      console.error(
        "Notification Error:",
        error
      );

    }

  };


  // ============================================================
  // Notification Border Color
  // ============================================================
  const getBorderColor = (message) => {

    const text =
      message?.toLowerCase() || "";


    if (text.includes("approved")) {
      return "border-green-500";
    }


    if (text.includes("rejected")) {
      return "border-red-500";
    }


    return "border-yellow-500";

  };


  return (

    <div className="flex min-h-screen">

      {/* Employee Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main
        className="
          flex-1
          min-w-0
          bg-slate-100
          min-h-screen
          p-3
          sm:p-5
          md:p-8
        "
      >

        <div className="w-full max-w-5xl mx-auto">

          {/* Navbar */}
          <Navbar />


          {/* Page Heading */}
          <div className="mt-6 sm:mt-8">

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-gray-800
              "
            >
              Notifications
            </h1>


            <p className="text-gray-500 mt-2">
              Notification history
            </p>

          </div>


          {/* Notifications List */}
          <div className="space-y-5 mt-8">

            {notifications.length === 0 ? (

              <div
                className="
                  bg-white
                  rounded-xl
                  shadow
                  p-8
                  sm:p-10
                  text-center
                "
              >

                <div className="text-6xl">
                  🔔
                </div>


                <h2
                  className="
                    text-2xl
                    font-semibold
                    mt-4
                  "
                >
                  No Notifications
                </h2>


                <p className="text-gray-500 mt-2">

                  You don't have any
                  notifications yet.

                </p>

              </div>

            ) : (

              notifications.map((item) => (

                <div
                  key={item.id}
                  className={`
                    bg-white
                    border-l-8
                    ${getBorderColor(item.message)}
                    rounded-xl
                    shadow
                    p-5
                  `}
                >

                  {/* Notification Message */}
                  <p
                    className="
                      text-gray-800
                      text-base
                      sm:text-lg
                      font-medium
                      break-words
                    "
                  >
                    {item.message}
                  </p>


                  {/* India Date & Time */}
                  <p
                    className="
                      text-gray-400
                      text-sm
                      mt-3
                    "
                  >
                    {formatIndiaDateTime(
                      item.created_at
                    )}
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