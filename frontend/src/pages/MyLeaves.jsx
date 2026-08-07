import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MyLeaves() {

  const [leaves, setLeaves] = useState([]);

  // ==============================
  // Fetch My Leaves
  // ==============================
  const fetchLeaves = async () => {

    try {

      const res = await api.get("/leave/my-leaves");

      setLeaves(res.data.leaves);

    } catch (error) {

      console.error(error);

    }

  };

  // ==============================
  // Load Leaves
  // ==============================
  useEffect(() => {

    fetchLeaves();

  }, []);

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

    <div className="flex">

      <Sidebar />

      <main className="flex-1 bg-slate-100 min-h-screen p-8">

        <Navbar />

        <div className="bg-white rounded-xl shadow-lg mt-8 overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-bold">

              My Leave Requests

            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4">Reason</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Document</th>

              </tr>

            </thead>

            <tbody>

              {

                leaves.map((leave) => (

                  <tr
                    key={leave.id}
                    className="border-t"
                  >

                    <td className="p-4">

                      {leave.reason}

                    </td>

                    <td className="text-center">

                      {leave.start_date}

                    </td>

                    <td className="text-center">

                      {leave.end_date}

                    </td>

                    <td className="text-center">

                      <span
                        className={`px-3 py-1 rounded-full ${badgeColor(leave.status)}`}
                      >

                        {leave.status}

                      </span>

                    </td>

                    <td className="text-center">

                      {leave.manager_remarks || "-"}

                    </td>

                    <td className="text-center">

                      {

                        leave.document_url

                        ?

                        <a
                          href={leave.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >

                          View

                        </a>

                        :

                        "-"

                      }

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}