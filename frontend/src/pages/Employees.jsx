import { useEffect, useState } from "react";

import api from "../services/api";

import ManagerNavbar from "../components/manager/ManagerNavbar";
import ManagerSidebar from "../components/manager/ManagerSidebar";

export default function Employees() {

  // ============================================================
  // Employee Data
  // ============================================================
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");


  // ============================================================
  // Load Employees
  // ============================================================
  useEffect(() => {

    loadEmployees();

  }, []);


  async function loadEmployees() {

    try {

      const res = await api.get("/employees");

      setEmployees(res.data.employees || []);

    } catch (error) {

      console.error(
        "Employee Fetch Error:",
        error
      );

    }

  }


  // ============================================================
  // Search Employees
  // ============================================================
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.username
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );


  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* ======================================================
          Manager Sidebar
      ====================================================== */}
      <ManagerSidebar />


      {/* ======================================================
          Main Content
      ====================================================== */}
      <main className="flex-1 min-w-0 bg-slate-100 min-h-screen p-3 sm:p-5 md:p-8">

        <div className="w-full max-w-6xl mx-auto">

          {/* Manager Navbar */}
          <ManagerNavbar />


          {/* ==================================================
              Employees Container
          ================================================== */}
          <div className="bg-white rounded-xl shadow-lg mt-6 sm:mt-8 p-4 sm:p-6">


            {/* =================================================
                Header + Search
            ================================================= */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

              <h2 className="text-2xl sm:text-3xl font-bold">
                Employees
              </h2>


              {/* Search */}
              <input
                type="text"
                placeholder="Search Employee..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  border
                  rounded-xl
                  px-4
                  py-3
                  w-full
                  lg:w-72
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>


            {/* =================================================
                MOBILE VIEW
            ================================================= */}
            <div className="block md:hidden space-y-4">

              {filteredEmployees.length === 0 ? (

                <div className="text-center text-gray-500 py-8">
                  No Employees Found
                </div>

              ) : (

                filteredEmployees.map((employee) => (

                  <div
                    key={employee.id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm"
                  >

                    {/* Username */}
                    <div className="mb-4">

                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Username
                      </p>

                      <p className="mt-1 font-medium text-gray-800 break-words">
                        {employee.username}
                      </p>

                    </div>


                    {/* Role */}
                    <div className="mb-4">

                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Role
                      </p>

                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {employee.role}
                      </span>

                    </div>


                    {/* Created */}
                    <div>

                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Created
                      </p>

                      <p className="mt-1 text-gray-700">
                        {new Date(
                          employee.created_at
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                ))

              )}

            </div>


            {/* =================================================
                DESKTOP TABLE
            ================================================= */}
            <div className="hidden md:block overflow-x-auto">

              <table className="w-full min-w-[650px]">

                <thead className="bg-gray-200">

                  <tr>

                    <th className="p-4 text-left">
                      Username
                    </th>

                    <th className="p-4 text-left">
                      Role
                    </th>

                    <th className="p-4 text-left">
                      Created
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredEmployees.length === 0 ? (

                    <tr>

                      <td
                        colSpan="3"
                        className="text-center p-8 text-gray-500"
                      >
                        No Employees Found
                      </td>

                    </tr>

                  ) : (

                    filteredEmployees.map((employee) => (

                      <tr
                        key={employee.id}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-4">
                          {employee.username}
                        </td>


                        <td className="p-4">

                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {employee.role}
                          </span>

                        </td>


                        <td className="p-4">

                          {new Date(
                            employee.created_at
                          ).toLocaleDateString()}

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}