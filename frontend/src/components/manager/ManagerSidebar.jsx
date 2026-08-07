import {
  ClipboardList,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function ManagerSidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <aside className="w-72 bg-slate-900 text-white min-h-screen">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          ELMS
        </h1>

        <p className="text-gray-400">
          Manager Panel
        </p>

      </div>

      <nav className="mt-6 flex flex-col">


        <Link
          to="/manage-leaves"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <ClipboardList size={20}/>
          Leave Requests
        </Link>

        <Link
          to="/manager/employees"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <Users size={20}/>
          Employees
        </Link>

        <Link
          to="/manager/reports"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <BarChart3 size={20}/>
          Reports
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