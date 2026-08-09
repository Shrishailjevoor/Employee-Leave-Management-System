import { useEffect, useState } from "react";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import ManagerSidebar from "../components/manager/ManagerSidebar";
import ManagerNavbar from "../components/manager/ManagerNavbar";


// ============================================================
// Chart Colors
// ============================================================
const COLORS = [
  "#16a34a", // Approved
  "#dc2626", // Rejected
  "#eab308", // Pending
];


// ============================================================
// Reports Component
// ============================================================
export default function Reports() {

  const [requests, setRequests] = useState([]);


  // ============================================================
  // Load Requests
  // ============================================================
  useEffect(() => {
    loadRequests();
  }, []);


  // ============================================================
  // Fetch Leave Requests
  // ============================================================
  const loadRequests = async () => {

    try {

      const res = await api.get("/manager/leaves");

      setRequests(
        res.data.requests || []
      );

    } catch (err) {

      console.error(
        "Error fetching requests:",
        err
      );

    }

  };


  // ============================================================
  // Statistics
  // ============================================================
  const approved = requests.filter(
    (r) => r.status === "Approved"
  ).length;

  const rejected = requests.filter(
    (r) => r.status === "Rejected"
  ).length;

  const pending = requests.filter(
    (r) => r.status === "Pending"
  ).length;


  // ============================================================
  // Chart Data
  // ============================================================
  const data = [
    {
      name: "Approved",
      value: approved,
    },
    {
      name: "Rejected",
      value: rejected,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];


  // ============================================================
  // Export PDF
  // ============================================================
  const exportPDF = () => {

    const doc = new jsPDF();

    const total = requests.length;


    doc.setFontSize(22);

    doc.text(
      "Employee Leave Management System",
      14,
      15
    );


    doc.setFontSize(16);

  doc.text(
  `Generated: ${new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}`,
  14,
  33
);


    doc.setFontSize(11);

   doc.text(
  `Generated: ${getIndiaDateTime()}`,
  14,
  33
);


    doc.text(
      `Total Requests : ${total}`,
      14,
      42
    );

    doc.text(
      `Approved : ${approved}`,
      14,
      49
    );

    doc.text(
      `Pending : ${pending}`,
      14,
      56
    );

    doc.text(
      `Rejected : ${rejected}`,
      14,
      63
    );


    autoTable(doc, {

      startY: 72,

      head: [
        [
          "Employee",
          "Reason",
          "Start Date",
          "End Date",
          "Status",
          "Remarks",
        ],
      ],

      body: requests.map((leave) => [

        leave.users?.username || "-",

        leave.reason,

        leave.start_date,

        leave.end_date,

        leave.status,

        leave.manager_remarks || "-",

      ]),

      headStyles: {
        fillColor: [37, 99, 235],
      },

      styles: {
        fontSize: 10,
        cellPadding: 3,
      },

    });


    doc.save(
      "Employee_Leave_Report.pdf"
    );

  };


  // ============================================================
  // Export Excel
  // ============================================================
  const exportExcel = () => {

    const excelData = requests.map(
      (leave) => ({

        Employee:
          leave.users?.username || "-",

        Reason:
          leave.reason,

        Start_Date:
          leave.start_date,

        End_Date:
          leave.end_date,

        Status:
          leave.status,

        Remarks:
          leave.manager_remarks || "-",

      })
    );


    const worksheet =
      XLSX.utils.json_to_sheet(
        excelData
      );


    const workbook =
      XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leave Report"
    );


    XLSX.writeFile(
      workbook,
      `Leave_Report_${
        new Date()
          .toISOString()
          .split("T")[0]
      }.xlsx`
    );

  };


  // ============================================================
  // Page
  // ============================================================
  return (

    <div className="flex min-h-screen bg-slate-100">


      {/* ======================================================
          MANAGER SIDEBAR
      ====================================================== */}
      <ManagerSidebar />


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}
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


          {/* ==================================================
              MANAGER NAVBAR
          ================================================== */}
          <ManagerNavbar />


          {/* ==================================================
              REPORT HEADER
          ================================================== */}
          <div
            className="
              mt-6
              sm:mt-8
              flex
              flex-col
              gap-4
            "
          >

            <div>

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-gray-800
                "
              >
                Reports
              </h1>


              <p className="text-gray-500 mt-2">
                Leave analytics and reports
              </p>

            </div>


            {/* =================================================
                EXPORT BUTTONS
            ================================================= */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                sm:gap-4
              "
            >

              <button
                onClick={exportPDF}
                className="
                  w-full
                  sm:w-auto
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-5
                  py-3
                  rounded-lg
                  font-semibold
                  shadow
                  transition-colors
                "
              >
                📄 Export PDF
              </button>


              <button
                onClick={exportExcel}
                className="
                  w-full
                  sm:w-auto
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-5
                  py-3
                  rounded-lg
                  font-semibold
                  shadow
                  transition-colors
                "
              >
                📊 Export Excel
              </button>

            </div>

          </div>


          {/* ==================================================
              CHART CARD
          ================================================== */}
          <div
            className="
              bg-white
              rounded-xl
              shadow-lg
              p-5
              sm:p-8
              mt-8
              w-full
              max-w-2xl
            "
          >

            <h2
              className="
                text-xl
                sm:text-2xl
                font-semibold
                mb-4
                text-gray-700
              "
            >
              Leave Requests Distribution
            </h2>


            {/* =================================================
                PIE CHART
            ================================================= */}
            <ResponsiveContainer
              width="100%"
              height={370}
            >

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label
                >

                  {data.map(
                    (entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </main>

    </div>

  );

}