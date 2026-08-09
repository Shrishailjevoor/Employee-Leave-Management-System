import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ApplyLeave() {

  const navigate = useNavigate();

  // ============================================================
  // Form State
  // ============================================================
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [document, setDocument] = useState(null);

  const [loading, setLoading] = useState(false);


  // ============================================================
  // Submit Leave Application
  // ============================================================
  const submitLeave = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("reason", reason);
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);

      if (document) {
        formData.append("document", document);
      }

      await api.post("/leave/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Leave Applied Successfully");

      navigate("/my-leaves");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

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

        {/* Keep content away from mobile edges */}
        <div className="w-full max-w-5xl mx-auto">

          <Navbar />


          {/* ==================================================
              Apply Leave Card

              Mobile:
              - Full available width
              - Space around edges
              - Smaller padding

              Desktop:
              - Maximum width
              - Larger padding
          ================================================== */}
          <div className="bg-white mt-6 sm:mt-8 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 w-full max-w-2xl">

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              Apply Leave
            </h1>


            {/* =================================================
                Leave Form
            ================================================= */}
            <form
              onSubmit={submitLeave}
              className="space-y-6"
            >

              {/* =================================================
                  Reason
              ================================================= */}
              <div>

                <label className="font-semibold block">
                  Reason
                </label>

                <textarea
                  className="border w-full mt-2 rounded-xl p-3 sm:p-4 resize-y outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />

              </div>


              {/* =================================================
                  Start & End Dates
                  
                  Mobile:
                  One column

                  Tablet/Desktop:
                  Two columns
              ================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Start Date */}
                <div>

                  <label className="font-semibold block">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="border w-full mt-2 rounded-xl p-3 sm:p-4 outline-none focus:ring-2 focus:ring-blue-500"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />

                </div>


                {/* End Date */}
                <div>

                  <label className="font-semibold block">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="border w-full mt-2 rounded-xl p-3 sm:p-4 outline-none focus:ring-2 focus:ring-blue-500"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />

                </div>

              </div>


              {/* =================================================
                  Supporting Document
              ================================================= */}
              <div>

                <label className="font-semibold block mb-2">
                  Supporting Document
                </label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setDocument(e.target.files[0])}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-lg
                    p-2 sm:p-3
                    bg-white
                    cursor-pointer
                    text-sm
                    sm:text-base
                    file:mr-2
                    sm:file:mr-4
                    file:py-2
                    file:px-3
                    sm:file:px-4
                    file:border-0
                    file:rounded-md
                    file:bg-blue-600
                    file:text-white
                    file:font-medium
                    hover:file:bg-blue-700
                  "
                />

              </div>


              {/* =================================================
                  Submit Button
              ================================================= */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  sm:w-auto
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:opacity-70
                  text-white
                  px-8
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                {loading ? "Submitting..." : "Apply Leave"}
              </button>

            </form>

          </div>

        </div>

      </main>

    </div>

  );
}