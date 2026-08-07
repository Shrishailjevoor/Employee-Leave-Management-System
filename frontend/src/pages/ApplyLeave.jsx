import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ApplyLeave() {

  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [document, setDocument] = useState(null);

  const [loading, setLoading] = useState(false);

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

    <div className="flex">

      <Sidebar/>

      <main className="flex-1 bg-slate-100 min-h-screen p-8">

        <Navbar/>

        <div className="bg-white mt-8 rounded-2xl shadow-xl p-8 max-w-2xl">

          <h1 className="text-3xl font-bold mb-8">

            Apply Leave

          </h1>

          <form
            onSubmit={submitLeave}
            className="space-y-6"
          >

            <div>

              <label className="font-semibold">

                Reason

              </label>

              <textarea

                className="border w-full mt-2 rounded-xl p-3"

                rows="4"

                value={reason}

                onChange={(e)=>setReason(e.target.value)}

                required

              />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold">

                  Start Date

                </label>

                <input

                  type="date"

                  className="border w-full mt-2 rounded-xl p-3"

                  value={startDate}

                  onChange={(e)=>setStartDate(e.target.value)}

                  required

                />

              </div>

              <div>

                <label className="font-semibold">

                  End Date

                </label>

                <input

                  type="date"

                  className="border w-full mt-2 rounded-xl p-3"

                  value={endDate}

                  onChange={(e)=>setEndDate(e.target.value)}

                  required

                />

              </div>

            </div>

            <div className="mb-5">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Medical Document (Optional)
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
      p-3
      bg-white
      cursor-pointer
      file:mr-4
      file:py-2
      file:px-4
      file:border-0
      file:rounded-md
      file:bg-blue-600
      file:text-white
      file:font-medium
      hover:file:bg-blue-700
    "
  />
</div>

            <button

              disabled={loading}

              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"

            >

              {

                loading

                ?

                "Submitting..."

                :

                "Apply Leave"

              }

            </button>

          </form>

        </div>

      </main>

    </div>

  );

}