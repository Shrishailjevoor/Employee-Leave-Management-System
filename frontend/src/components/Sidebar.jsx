import {
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  Bell,
  LogOut
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <aside className="w-72 bg-slate-900 text-white min-h-screen">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          ELMS
        </h1>

        <p className="text-sm text-gray-400">
          Employee Leave System
        </p>

      </div>

      <nav className="mt-6 flex flex-col">

        <Link
          to="/employee"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </Link>

        <Link
          to="/apply-leave"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FilePlus2 size={20}/>
          Apply Leave
        </Link>

        <Link
          to="/my-leaves"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <ClipboardList size={20}/>
          My Leaves
        </Link>

        <Link
          to="/notifications"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <Bell size={20}/>
          Notifications
        </Link>

        <button

          onClick={logout}

          className="flex items-center gap-3 px-6 py-4 hover:bg-red-600 text-left"

        >

          <LogOut size={20}/>

          Logout

        </button>

      </nav>

    </aside>

  );

}