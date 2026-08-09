import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import ManagerStatCard from "../components/manager/ManagerStatCard";

import { useEffect, useState } from "react";

import api from "../services/api";

import ManagerNavbar from "../components/manager/ManagerNavbar";
import ManagerSidebar from "../components/manager/ManagerSidebar";

import { FileText } from "lucide-react";


export default function ManagerDashboard() {

  // ============================================================
  // Leave Requests
  // ============================================================
  const [requests, setRequests] = useState([]);


  // ============================================================
  // Search and Status Filter
  // ============================================================
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");


  // ============================================================
  // Approve / Reject Modal
  // ============================================================
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [targetStatus, setTargetStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  // ============================================================
  // Toast State
  // ============================================================
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });


  // ============================================================
  // Show Toast
  // ============================================================
  const showToast = (message, type = "success") => {

    setToast({
      show: true,
      message,
      type,
    });


    setTimeout(() => {

      setToast({
        show: false,
        message: "",
        type: "",
      });

    }, 3500);

  };


  // ============================================================
  // Format Date
  // ============================================================
  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  };


  // ============================================================
  // Statistics
  // ============================================================
  const total = requests.length;

  const pending = requests.filter(
    (r) => r.status === "Pending"
  ).length;

  const approved = requests.filter(
    (r) => r.status === "Approved"
  ).length;

  const rejected = requests.filter(
    (r) => r.status === "Rejected"
  ).length;


  // ============================================================
  // Search + Filter
  // ============================================================
  const filteredRequests = requests.filter((leave) => {

    const matchesSearch = leave.users?.username
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      leave.status === statusFilter;

    return matchesSearch && matchesStatus;

  });


  // ============================================================
  // Load Leave Requests
  // ============================================================
  const loadRequests = async () => {

    try {

      const res = await api.get("/manager/leaves");

      setRequests(res.data.requests || []);

    } catch (error) {

      console.error(
        "Error fetching requests:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Failed to load leave requests.",
        "error"
      );

    }

  };


  // ============================================================
  // Load Requests When Page Opens
  // ============================================================
  useEffect(() => {

    loadRequests();

  }, []);


  // ============================================================
  // Open Approve / Reject Modal
  // ============================================================
  const openConfirmationModal = (
    leave,
    status
  ) => {

    setSelectedLeave(leave);
    setTargetStatus(status);
    setRemarks("");
    setModalOpen(true);

  };


  // ============================================================
  // Approve / Reject Leave
  // ============================================================
  const handleConfirmStatusUpdate = async (e) => {

    e.preventDefault();

    if (!selectedLeave) return;

    setIsSubmitting(true);

    try {

      await api.patch(
        `/manager/leave/${selectedLeave.id}`,
        {
          status: targetStatus,
          manager_remarks: remarks,
        }
      );


      await loadRequests();


      showToast(
        `Leave ${targetStatus} Successfully`,
        "success"
      );


      setModalOpen(false);
      setSelectedLeave(null);

    } catch (error) {

      showToast(
        error.response?.data?.message ||
        "Something went wrong.",
        "error"
      );

    } finally {

      setIsSubmitting(false);

    }

  };


  // ============================================================
  // Export PDF
  // ============================================================
  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Employee Leave Report",
      14,
      20
    );


    autoTable(doc, {

      head: [[
        "Employee",
        "Reason",
        "Start Date",
        "End Date",
        "Status",
        "Remarks",
      ]],

      body: requests.map((leave) => [

        leave.users?.username || "-",

        leave.reason || "-",

        formatDate(leave.start_date),

        formatDate(leave.end_date),

        leave.status,

        leave.manager_remarks || "-",

      ]),

    });


    doc.save("Leave_Report.pdf");

  };


  // ============================================================
  // Export Excel
  // ============================================================
  const exportExcel = () => {

    const data = requests.map((leave) => ({

      Employee:
        leave.users?.username || "-",

      Reason:
        leave.reason || "-",

      Start_Date:
        formatDate(leave.start_date),

      End_Date:
        formatDate(leave.end_date),

      Status:
        leave.status,

      Remarks:
        leave.manager_remarks || "-",

    }));


    const worksheet =
      XLSX.utils.json_to_sheet(data);


    const workbook =
      XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leave Report"
    );


    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );


    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );


    saveAs(
      file,
      "Leave_Report.xlsx"
    );

  };


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

        <div className="w-full max-w-7xl mx-auto">


          {/* ==================================================
              Toast
          ================================================== */}
          {toast.show && (

            <div
              className={`
                fixed
                top-4
                left-4
                right-4
                sm:left-auto
                sm:right-6
                sm:top-6
                px-5
                py-3
                rounded-xl
                shadow-lg
                text-white
                font-medium
                z-50
                text-center
                sm:text-left
                ${
                  toast.type === "error"
                    ? "bg-red-600"
                    : "bg-green-600"
                }
              `}
            >
              {toast.message}
            </div>

          )}


          {/* Manager Navbar */}
          <ManagerNavbar />


          {/* ==================================================
              Statistics
          ================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">

            <ManagerStatCard
              title="Total Requests"
              value={total}
              color="blue"
            />

            <ManagerStatCard
              title="Pending"
              value={pending}
              color="yellow"
            />

            <ManagerStatCard
              title="Approved"
              value={approved}
              color="green"
            />

            <ManagerStatCard
              title="Rejected"
              value={rejected}
              color="red"
            />

          </div>


          {/* ==================================================
              Header + Search + Filter + Export
          ================================================== */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 mt-6 sm:mt-8">

            <div className="flex flex-col lg:flex-row justify-between gap-5">

              {/* Heading */}
              <div>

                <h2 className="text-xl sm:text-2xl font-bold">
                  Employee Leave Requests
                </h2>

                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  Review and manage employee leave applications.
                </p>

              </div>


              {/* Export Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                <button
                  type="button"
                  onClick={exportPDF}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl"
                >
                  Export PDF
                </button>


                <button
                  type="button"
                  onClick={exportExcel}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl"
                >
                  Export Excel
                </button>

              </div>

            </div>


            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5">

              <input
                type="text"
                placeholder="Search Employee..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="border rounded-xl px-4 py-3 w-full sm:max-w-md outline-none focus:ring-2 focus:ring-blue-500"
              />


              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="border rounded-xl px-4 py-3 w-full sm:w-auto bg-white outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="All">
                  All
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>


          {/* ==================================================
              MOBILE LEAVE REQUEST CARDS
          ================================================== */}
          <div className="block md:hidden mt-4 space-y-4">

            {filteredRequests.length === 0 ? (

              <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
                No Leave Requests Found
              </div>

            ) : (

              filteredRequests.map((leave) => (

                <div
                  key={leave.id}
                  className="bg-white rounded-xl shadow-lg p-4"
                >

                  {/* Employee */}
                  <div className="mb-4">

                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Employee
                    </p>

                    <p className="font-semibold text-gray-800 mt-1 break-words">
                      {leave.users?.username || "-"}
                    </p>

                  </div>


                  {/* Reason */}
                  <div className="mb-4">

                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Reason
                    </p>

                    <p className="text-gray-700 mt-1 break-words">
                      {leave.reason || "-"}
                    </p>

                  </div>


                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3 mb-4">

                    <div>

                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        From
                      </p>

                      <p className="text-sm text-gray-800 mt-1">
                        {formatDate(leave.start_date)}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        To
                      </p>

                      <p className="text-sm text-gray-800 mt-1">
                        {formatDate(leave.end_date)}
                      </p>

                    </div>

                  </div>


                  {/* Status */}
                  <div className="mb-4">

                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Status
                    </p>

                    {leave.status === "Pending" && (

                      <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                        Pending
                      </span>

                    )}

                    {leave.status === "Approved" && (

                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Approved
                      </span>

                    )}

                    {leave.status === "Rejected" && (

                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Rejected
                      </span>

                    )}

                  </div>


                  {/* Document */}
                  <div className="mb-4">

                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Document
                    </p>

                    {leave.document_url ? (

                      <a
                        href={leave.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        <FileText size={16} />
                        View Document
                      </a>

                    ) : (

                      <span className="text-gray-400">
                        -
                      </span>

                    )}

                  </div>


                  {/* Remarks */}
                  <div className="mb-4">

                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Remarks
                    </p>

                    <p className="text-gray-700 mt-1 break-words">
                      {leave.manager_remarks || "-"}
                    </p>

                  </div>


                  {/* Action */}
                  <div>

                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Action
                    </p>


                    {leave.status === "Pending" ? (

                      <div className="grid grid-cols-2 gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            openConfirmationModal(
                              leave,
                              "Approved"
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-lg text-sm font-medium"
                        >
                          Approve
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            openConfirmationModal(
                              leave,
                              "Rejected"
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-3 rounded-lg text-sm font-medium"
                        >
                          Reject
                        </button>

                      </div>

                    ) : leave.status === "Approved" ? (

                      <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                        ✓ Approved
                      </span>

                    ) : (

                      <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold text-sm">
                        ✗ Rejected
                      </span>

                    )}

                  </div>

                </div>

              ))

            )}

          </div>


          {/* ==================================================
              DESKTOP LEAVE TABLE
          ================================================== */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden mt-4">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px]">

                <thead className="bg-gray-200">

                  <tr>

                    <th className="p-4 text-left">
                      Employee
                    </th>

                    <th className="p-4 text-left">
                      Reason
                    </th>

                    <th className="p-4 text-center">
                      From
                    </th>

                    <th className="p-4 text-center">
                      To
                    </th>

                    <th className="p-4 text-center">
                      Status
                    </th>

                    <th className="p-4 text-center">
                      Document
                    </th>

                    <th className="p-4 text-left">
                      Remarks
                    </th>

                    <th className="p-4 text-center">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredRequests.length === 0 ? (

                    <tr>

                      <td
                        colSpan="8"
                        className="text-center p-8 text-gray-500"
                      >
                        No Leave Requests Found
                      </td>

                    </tr>

                  ) : (

                    filteredRequests.map((leave) => (

                      <tr
                        key={leave.id}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-4 font-medium">
                          {leave.users?.username || "-"}
                        </td>


                        <td className="p-4 max-w-sm whitespace-normal break-words">
                          {leave.reason || "-"}
                        </td>


                        <td className="p-4 text-center">
                          {formatDate(leave.start_date)}
                        </td>


                        <td className="p-4 text-center">
                          {formatDate(leave.end_date)}
                        </td>


                        <td className="p-4 text-center">

                          {leave.status === "Pending" && (

                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                              Pending
                            </span>

                          )}

                          {leave.status === "Approved" && (

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              Approved
                            </span>

                          )}

                          {leave.status === "Rejected" && (

                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                              Rejected
                            </span>

                          )}

                        </td>


                        <td className="p-4 text-center">

                          {leave.document_url ? (

                            <a
                              href={leave.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                            >

                              <FileText size={16} />

                              View

                            </a>

                          ) : (

                            <span className="text-gray-400">
                              -
                            </span>

                          )}

                        </td>


                        <td className="p-4 max-w-xs whitespace-normal break-words">
                          {leave.manager_remarks || "-"}
                        </td>


                        <td className="p-4 text-center">

                          {leave.status === "Pending" ? (

                            <div className="flex justify-center gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  openConfirmationModal(
                                    leave,
                                    "Approved"
                                  )
                                }
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                              >
                                Approve
                              </button>


                              <button
                                type="button"
                                onClick={() =>
                                  openConfirmationModal(
                                    leave,
                                    "Rejected"
                                  )
                                }
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                              >
                                Reject
                              </button>

                            </div>

                          ) : leave.status === "Approved" ? (

                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                              ✓ Approved
                            </span>

                          ) : (

                            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold text-sm">
                              ✗ Rejected
                            </span>

                          )}

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ==================================================
              Approve / Reject Modal
          ================================================== */}
          {modalOpen && (

            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto">

                <h3 className="text-xl font-bold mb-2">
                  Confirm {targetStatus} Leave
                </h3>


                <p className="text-gray-600 text-sm mb-4">

                  Add optional remarks for{" "}

                  <span className="font-semibold break-words">
                    {selectedLeave?.users?.username}
                  </span>

                  's request.

                </p>


                <form
                  onSubmit={handleConfirmStatusUpdate}
                >

                  <textarea
                    value={remarks}
                    onChange={(e) =>
                      setRemarks(e.target.value)
                    }
                    placeholder="Enter Manager Remarks..."
                    rows="4"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-y"
                  />


                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setModalOpen(false)
                      }
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-4 py-3 rounded-lg border text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>


                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full
                        sm:w-auto
                        px-4
                        py-3
                        rounded-lg
                        text-white
                        font-medium
                        ${
                          targetStatus === "Approved"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }
                        disabled:opacity-50
                      `}
                    >

                      {isSubmitting
                        ? "Submitting..."
                        : `Confirm ${targetStatus}`}

                    </button>

                  </div>

                </form>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>

  );

}