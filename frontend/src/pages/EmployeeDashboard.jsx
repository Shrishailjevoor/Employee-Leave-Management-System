import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

export default function EmployeeDashboard() {

  // ============================================================
  // Dashboard Statistics
  // ============================================================
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });


  // ============================================================
  // Load Dashboard Data
  // ============================================================
  useEffect(() => {

    fetchDashboard();
    loadUnreadNotifications();

  }, []);


  // ============================================================
  // Fetch Employee Dashboard Statistics
  // ============================================================
  const fetchDashboard = async () => {

    try {

      const res = await api.get("/dashboard/employee");

      setStats(res.data.stats);

    } catch (error) {

      console.error("Dashboard Error:", error);

    }

  };


  // ============================================================
  // Load Unread Notifications
  // ============================================================
  const loadUnreadNotifications = async () => {

    try {

      const res = await api.get("/notifications/unread");

      const notifications =
        res.data.notifications || [];


      notifications.forEach((notification) => {

        toast.success(notification.message, {
          duration: 5000,
        });

      });


      // Mark notifications as read
      if (notifications.length > 0) {

        await api.patch("/notifications/read");

      }

    } catch (error) {

      console.error(
        "Notification Error:",
        error
      );

    }

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

        {/* ====================================================
            Responsive Content Container

            Keeps content away from phone edges and prevents
            unnecessary stretching on large screens.
        ==================================================== */}
        <div className="w-full max-w-5xl mx-auto">

          {/* Employee Navbar */}
          <Navbar />


          {/* ==================================================
              Dashboard Statistics

              Mobile:
              1 column

              Small screens:
              2 columns

              Large screens:
              4 columns
          ================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">

            <StatCard
              title="Total Leaves"
              value={stats.total}
              color="blue"
            />

            <StatCard
              title="Pending"
              value={stats.pending}
              color="yellow"
            />

            <StatCard
              title="Approved"
              value={stats.approved}
              color="green"
            />

            <StatCard
              title="Rejected"
              value={stats.rejected}
              color="red"
            />

          </div>

        </div>

      </main>

    </div>

  );

}