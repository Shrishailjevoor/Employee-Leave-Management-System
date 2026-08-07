import toast from "react-hot-toast";

import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import StatCard from "../components/StatCard";

export default function EmployeeDashboard() {

  const [stats, setStats] = useState({

    total:0,

    pending:0,

    approved:0,

    rejected:0

  });

  useEffect(() => {
  fetchDashboard();
  loadUnreadNotifications();
}, []);

const fetchDashboard = async () => {
  try {
    const res = await api.get("/dashboard/employee");
    setStats(res.data.stats);
  } catch (error) {
    console.log(error);
  }
};

const loadUnreadNotifications = async () => {
  try {

    const res = await api.get("/notifications/unread");

    const notifications = res.data.notifications || [];

    notifications.forEach((notification) => {

      toast.success(notification.message, {
        duration: 5000,
      });

    });

    if (notifications.length > 0) {
      await api.patch("/notifications/read");
    }

  } catch (error) {

    console.log(error);

  }
};

const loadNotifications = async () => {
  try {
    console.log("Loading notifications...");

    const res = await api.get("/notifications");

    console.log("Notification Response:", res.data);

    const notifications = res.data.notifications || [];

    notifications.forEach((notification) => {
      toast.success(notification.message, {
        duration: 5000,
      });
    });

    if (notifications.length > 0) {
      await api.patch("/notifications/read");
    }

  } catch (error) {
    console.log("Notification Error:", error);
  }
};
  return(

    <div className="flex">

      <Sidebar/>

      <main className="flex-1 bg-slate-100 min-h-screen p-8">

        <Navbar/>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

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

      </main>

    </div>

  );

}