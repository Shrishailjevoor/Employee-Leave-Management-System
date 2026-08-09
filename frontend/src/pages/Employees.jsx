import { useEffect, useState } from "react";
import api from "../services/api";

import ManagerNavbar from "../components/manager/ManagerNavbar";
import ManagerSidebar from "../components/manager/ManagerSidebar";

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");


  // ============================================================
  // Format Created Date in India
  // ============================================================
  const formatIndiaDate = (dateString) => {

    if (!dateString) {
      return "-";
    }

    const value = String(dateString);

    // PostgreSQL date format: YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {

      const [year, month, day] = value.split("-");

      return `${Number(day)}/${Number(month)}/${year}`;
    }

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

    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };


  // ============================================================
  // Load Employees
  // ============================================================
  useEffect(() => {
    loadEmployees();
  }, []);


  // ============================================================
  // Fetch Employees
  // ============================================================
  async function loadEmployees() {

    try {

      const res = await api.get("/employees");

      setEmployees(
        res.data.employees || []
      );

    } catch (error) {

      console.error(
        "Employee Error:",
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

    <div className="flex min-h-screen">

      {/* Manager Sidebar */}
      <ManagerSidebar />


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

        <div className="w-full max-w-6xl mx-auto">

          {/* Manager Navbar */}
          <ManagerNavbar />


          {/* Employees Card */}
          <div
            className="
              bg-white
              rounded-xl
              shadow-lg
              mt-6
              sm:mt-8
              p-4
              sm:p-6
            "
          >

            {/* Header */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                mb-6
              "
            >

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                "
              >
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
                  border-gray-300
                  rounded-lg
                  px-4
                  py-2
                  w-full
                  sm:w-72
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>


            {/* Employee Table */}
            <div className="overflow-x-auto">

              <table
                className="
                  w-full
                  min-w-[600px]
                  border-collapse
                "
              >

                <thead className="bg-gray-200">

                  <tr>

                    <th
                      className="
                        p-4
                        text-left
                        font-semibold
                      "
                    >
                      Username
                    </th>

                    <th
                      className="
                        p-4
                        text-left
                        font-semibold
                      "
                    >
                      Role
                    </th>

                    <th
                      className="
                        p-4
                        text-left
                        font-semibold
                      "
                    >
                      Created
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredEmployees.length === 0 ? (

                    <tr>

                      <td
                        colSpan="3"
                        className="
                          p-8
                          text-center
                          text-gray-500
                        "
                      >
                        No employees found.
                      </td>

                    </tr>

                  ) : (

                    filteredEmployees.map(
                      (employee) => (

                        <tr
                          key={employee.id}
                          className="
                            border-t
                            hover:bg-gray-50
                            transition
                          "
                        >

                          <td className="p-4">

                            {employee.username}

                          </td>


                          <td className="p-4">

                            <span
                              className="
                                inline-block
                                bg-blue-100
                                text-blue-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                              "
                            >
                              {employee.role}
                            </span>

                          </td>


                          {/* India Date */}
                          <td className="p-4">

                            {formatIndiaDate(
                              employee.created_at
                            )}

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>


            {/* Mobile Employee Cards */}
            <div className="md:hidden mt-4 space-y-4">

              {filteredEmployees.length === 0 ? (

                <div
                  className="
                    text-center
                    text-gray-500
                    py-6
                  "
                >
                  No employees found.
                </div>

              ) : (

                filteredEmployees.map(
                  (employee) => (

                    <div
                      key={`mobile-${employee.id}`}
                      className="
                        border
                        border-gray-200
                        rounded-xl
                        p-4
                        shadow-sm
                        bg-white
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <div className="min-w-0">

                          <p
                            className="
                              font-semibold
                              text-gray-800
                              break-words
                            "
                          >
                            {employee.username}
                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-500
                              mt-1
                            "
                          >
                            Created:{" "}
                            {formatIndiaDate(
                              employee.created_at
                            )}
                          </p>

                        </div>


                        <span
                          className="
                            shrink-0
                            bg-blue-100
                            text-blue-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                          "
                        >
                          {employee.role}
                        </span>

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}