import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MyLeaves() {

  const [leaves, setLeaves] = useState([]);


  // ============================================================
  // Fetch Employee Leave Requests
  // ============================================================
  const fetchLeaves = async () => {

    try {

      const res = await api.get("/leave/my-leaves");

      setLeaves(res.data.leaves);

    } catch (error) {

      console.error("Leave Fetch Error:", error);

    }

  };


  // ============================================================
  // Load Leaves When Page Opens
  // ============================================================
  useEffect(() => {

    fetchLeaves();

  }, []);


  // ============================================================
  // Return Status Badge Color
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

    <div className="flex min-h-screen bg-slate-100">

      {/* ======================================================
          Employee Sidebar
      ====================================================== */}
      <Sidebar />


      {/* ======================================================
          Main Content
      ====================================================== */}
      <main className="flex-1 min-w-0 bg-slate-100 min-h-screen p-3 sm:p-5 md:p-8">

        <div className="w-full max-w-6xl mx-auto">

          <Navbar />


          {/* ==================================================
              Leave Requests Container
          ================================================== */}
          <div className="bg-white rounded-xl shadow-lg mt-6 sm:mt-8 overflow-hidden">


            {/* =================================================
                Page Heading
            ================================================= */}
            <div className="p-5 sm:p-6 border-b">

              <h2 className="text-xl sm:text-2xl font-bold">
                My Leave Requests
              </h2>

            </div>


            {/* =================================================
                MOBILE VIEW

                Cards are used instead of the wide table.
            ================================================= */}
            <div className="block md:hidden p-4 space-y-4">

              {leaves.length === 0 ? (

                <div className="text-center text-gray-500 py-8">
                  No leave requests found.
                </div>

              ) : (

                leaves.map((leave) => (

                  <div
                    key={leave.id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm"
                  >

                    {/* Leave Reason */}
                    <div className="mb-4">

                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Reason
                      </p>

                      <p className="mt-1 text-gray-800 break-words">
                        {leave.reason}
                      </p>

                    </div>


                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3 mb-4">

                      <div>

                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Start Date
                        </p>

                        <p className="mt-1 text-sm text-gray-800 break-words">
                          {leave.start_date}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          End Date
                        </p>

                        <p className="mt-1 text-sm text-gray-800 break-words">
                          {leave.end_date}
                        </p>

                      </div>

                    </div>


                    {/* Status */}
                    <div className="mb-4">

                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Status
                      </p>

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badgeColor(
                          leave.status
                        )}`}
                      >
                        {leave.status}
                      </span>

                    </div>


                    {/* Manager Remarks */}
                    <div className="mb-4">

                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Manager Remarks
                      </p>

                      <p className="mt-1 text-gray-700 break-words">
                        {leave.manager_remarks || "-"}
                      </p>

                    </div>


                    {/* Document */}
                    <div>

                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Document
                      </p>

                      {leave.document_url ? (

                        <a
                          href={leave.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-1 text-blue-600 underline font-medium"
                        >
                          View Document
                        </a>

                      ) : (

                        <p className="mt-1 text-gray-500">
                          -
                        </p>

                      )}

                    </div>

                  </div>

                ))

              )}

            </div>


            {/* =================================================
                DESKTOP / TABLET VIEW

                Existing table is retained for larger screens.
            ================================================= */}
            <div className="hidden md:block overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="bg-gray-200">

                  <tr>

                    <th className="p-4 text-left">
                      Reason
                    </th>

                    <th className="p-4">
                      Start
                    </th>

                    <th className="p-4">
                      End
                    </th>

                    <th className="p-4">
                      Status
                    </th>

                    <th className="p-4">
                      Remarks
                    </th>

                    <th className="p-4">
                      Document
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {leaves.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center text-gray-500 py-8"
                      >
                        No leave requests found.
                      </td>

                    </tr>

                  ) : (

                    leaves.map((leave) => (

                      <tr
                        key={leave.id}
                        className="border-t"
                      >

                        <td className="p-4">
                          {leave.reason}
                        </td>


                        <td className="text-center p-4">
                          {leave.start_date}
                        </td>


                        <td className="text-center p-4">
                          {leave.end_date}
                        </td>


                        <td className="text-center p-4">

                          <span
                            className={`px-3 py-1 rounded-full ${badgeColor(
                              leave.status
                            )}`}
                          >
                            {leave.status}
                          </span>

                        </td>


                        <td className="text-center p-4">
                          {leave.manager_remarks || "-"}
                        </td>


                        <td className="text-center p-4">

                          {leave.document_url ? (

                            <a
                              href={leave.document_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline"
                            >
                              View
                            </a>

                          ) : (

                            "-"

                          )}

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