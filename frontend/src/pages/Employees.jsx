import { useEffect, useState } from "react";
import api from "../services/api";
import ManagerNavbar from "../components/manager/ManagerNavbar";
import ManagerSidebar from "../components/manager/ManagerSidebar";

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {

    try {

      const res = await api.get("/employees");

      setEmployees(res.data.employees);

    } catch (error) {

      console.error(error);

    }

  }

  const filteredEmployees = employees.filter((employee) =>
    employee.username
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="flex">

      <ManagerSidebar />

      <main className="flex-1 bg-slate-100 min-h-screen p-8">

        <ManagerNavbar />

        <div className="bg-white rounded-xl shadow-lg mt-8 p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">

              Employees

            </h2>

            <input
              type="text"
              placeholder="Search Employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 w-72"
            />

          </div>

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">
                  Username
                </th>

                <th className="text-left">
                  Role
                </th>

                <th className="text-left">
                  Created
                </th>

              </tr>

            </thead>

            <tbody>

              {

                filteredEmployees.map((employee) => (

                  <tr
                    key={employee.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">

                      {employee.username}

                    </td>

                    <td>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                        {employee.role}

                      </span>

                    </td>

                    <td>

                      {

                        new Date(employee.created_at)
                          .toLocaleDateString()

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