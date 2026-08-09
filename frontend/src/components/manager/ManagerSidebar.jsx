import {
  ClipboardList,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ManagerSidebar() {

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);


  // ============================================================
  // Logout Manager
  // ============================================================
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };


  // ============================================================
  // Close Mobile Sidebar
  // ============================================================
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };


  return (

    <>

      {/* ======================================================
          Mobile Menu Button
      ====================================================== */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-50
          bg-slate-900
          text-white
          p-3
          rounded-xl
          shadow-lg
        "
        aria-label="Open manager menu"
      >
        <Menu size={22} />
      </button>


      {/* ======================================================
          Mobile Overlay
      ====================================================== */}
      {mobileOpen && (

        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={closeMobileMenu}
        />

      )}


      {/* ======================================================
          Manager Sidebar
      ====================================================== */}
      <aside
        className={`
          w-72
          bg-slate-900
          text-white
          min-h-screen
          shrink-0
          fixed
          inset-y-0
          left-0
          z-50
          transform
          transition-transform
          duration-300
          ease-in-out

          ${mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          md:relative
          md:block
          md:translate-x-0
        `}
      >

        {/* ====================================================
            Sidebar Header
        ==================================================== */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              ELMS
            </h1>

            <p className="text-gray-400">
              Manager Panel
            </p>

          </div>


          {/* Mobile Close */}
          <button
            type="button"
            onClick={closeMobileMenu}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Close manager menu"
          >
            <X size={24} />
          </button>

        </div>


        {/* ====================================================
            Manager Navigation
        ==================================================== */}
        <nav className="mt-6 flex flex-col">

          {/* Leave Requests */}
          <Link
            to="/manager"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition"
          >
            <ClipboardList size={20} />
            Leave Requests
          </Link>


          {/* Employees */}
          <Link
            to="/manager/employees"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition"
          >
            <Users size={20} />
            Employees
          </Link>


          {/* Reports */}
          <Link
            to="/manager/reports"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition"
          >
            <BarChart3 size={20} />
            Reports
          </Link>


          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 px-6 py-4 hover:bg-red-600 text-left transition"
          >
            <LogOut size={20} />
            Logout
          </button>

        </nav>

      </aside>

    </>

  );

}