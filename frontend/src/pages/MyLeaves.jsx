import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";



export default function MyLeaves() {

  const [leaves, setLeaves] =
    useState([]);

  const formatIndiaDate = (dateString) => {

    if (!dateString) {
      return "-";
    }

    const value = String(dateString);

    // PostgreSQL DATE format: YYYY-MM-DD
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
  // Fetch My Leaves
  // ============================================================
  const fetchLeaves = async () => {

    try {

      const res =
        await api.get("/leave/my-leaves");

      setLeaves(
        res.data.leaves || []
      );

    } catch (error) {

      console.error(
        "Leave Error:",
        error
      );

    }

  };


  // ============================================================
  // Load Leaves
  // ============================================================
  useEffect(() => {

    fetchLeaves();

  }, []);


  // ============================================================
  // Status Badge Color
  // ============================================================
  const badgeColor = (status) => {

    switch (status) {

      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";

    }

  };


  return (

    <div className="flex min-h-screen">

      <Sidebar />


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

          <Navbar />


          <div
            className="
              bg-white
              rounded-xl
              shadow-lg
              mt-6
              sm:mt-8
              overflow-hidden
            "
          >

            <div className="p-5 sm:p-6 border-b">

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                "
              >
                My Leave Requests
              </h2>

            </div>


            {/* ==================================================
                Desktop Table
            ================================================== */}
            <div className="hidden md:block overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-200">

                  <tr>

                    <th className="p-4">
                      Reason
                    </th>

                    <th>
                      Start
                    </th>

                    <th>
                      End
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Remarks
                    </th>

                    <th>
                      Document
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {leaves.map((leave) => (

                    <tr
                      key={leave.id}
                      className="border-t"
                    >

                      <td className="p-4">
                        {leave.reason}
                      </td>


                      <td className="text-center">
                        {formatIndiaDate(
                          leave.start_date
                        )}
                      </td>


                      <td className="text-center">
                        {formatIndiaDate(
                          leave.end_date
                        )}
                      </td>


                      <td className="text-center">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            ${badgeColor(
                              leave.status
                            )}
                          `}
                        >

                          {leave.status}

                        </span>

                      </td>


                      <td className="text-center">

                        {leave.manager_remarks || "-"}

                      </td>


                      <td className="text-center">

                        {leave.document_url ? (

                          <a
                            href={leave.document_url}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              text-blue-600
                              underline
                            "
                          >
                            View
                          </a>

                        ) : (

                          "-"

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* ==================================================
                Mobile Cards
            ================================================== */}
            <div className="md:hidden p-4 space-y-4">

              {leaves.length === 0 ? (

                <p className="text-center text-gray-500 py-8">

                  No leave requests found.

                </p>

              ) : (

                leaves.map((leave) => (

                  <div
                    key={leave.id}
                    className="
                      border
                      rounded-xl
                      p-4
                      shadow-sm
                    "
                  >

                    <p className="
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                    ">
                      Reason
                    </p>

                    <p className="
                      mt-1
                      text-gray-800
                      break-words
                    ">
                      {leave.reason}
                    </p>


                    <div className="
                      grid
                      grid-cols-2
                      gap-4
                      mt-5
                    ">

                      <div>

                        <p className="
                          text-xs
                          font-semibold
                          text-gray-500
                          uppercase
                        ">
                          Start Date
                        </p>

                        <p className="mt-1">
                          {formatIndiaDate(
                            leave.start_date
                          )}
                        </p>

                      </div>


                      <div>

                        <p className="
                          text-xs
                          font-semibold
                          text-gray-500
                          uppercase
                        ">
                          End Date
                        </p>

                        <p className="mt-1">
                          {formatIndiaDate(
                            leave.end_date
                          )}
                        </p>

                      </div>

                    </div>


                    <div className="mt-5">

                      <p className="
                        text-xs
                        font-semibold
                        text-gray-500
                        uppercase
                      ">
                        Status
                      </p>

                      <span
                        className={`
                          inline-block
                          mt-2
                          px-3
                          py-1
                          rounded-full
                          ${badgeColor(
                            leave.status
                          )}
                        `}
                      >

                        {leave.status}

                      </span>

                    </div>


                    <div className="mt-5">

                      <p className="
                        text-xs
                        font-semibold
                        text-gray-500
                        uppercase
                      ">
                        Manager Remarks
                      </p>

                      <p className="
                        mt-1
                        break-words
                      ">
                        {leave.manager_remarks || "-"}
                      </p>

                    </div>


                    <div className="mt-5">

                      <p className="
                        text-xs
                        font-semibold
                        text-gray-500
                        uppercase
                      ">
                        Document
                      </p>

                      {leave.document_url ? (

                        <a
                          href={leave.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            inline-block
                            mt-1
                            text-blue-600
                            underline
                          "
                        >
                          View Document
                        </a>

                      ) : (

                        <p className="mt-1">
                          -
                        </p>

                      )}

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}