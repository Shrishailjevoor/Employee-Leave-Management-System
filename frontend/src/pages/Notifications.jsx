import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getBorderColor = (message) => {
    if (message.toLowerCase().includes("approved"))
      return "border-green-500";

    if (message.toLowerCase().includes("rejected"))
      return "border-red-500";

    return "border-yellow-500";
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-slate-100 min-h-screen p-8">
        <Navbar />

        <h1 className="text-4xl font-bold text-gray-800 mt-4">
          Notifications
        </h1>

        <p className="text-gray-500 mb-8">
          Notification history
        </p>

        <div className="space-y-5">

          {notifications.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-10 text-center">

              <div className="text-6xl">
                🔔
              </div>

              <h2 className="text-2xl font-semibold mt-4">

                No Notifications

              </h2>

              <p className="text-gray-500 mt-2">

                You don't have any notifications yet.

              </p>

            </div>

          ) : (

            notifications.map((item) => (

              <div
                key={item.id}
                className={`bg-white border-l-8 ${getBorderColor(
                  item.message
                )} rounded-xl shadow p-5`}
              >

                <p className="text-gray-800 text-lg font-medium">

                  {item.message}

                </p>

                <p className="text-gray-400 text-sm mt-3">

                  {new Date(item.created_at).toLocaleString()}

                </p>

              </div>

            ))

          )}

        </div>
      </main>
    </div>
  );
}