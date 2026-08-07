export default function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center rounded-xl">

      <div>

        <h1 className="text-3xl font-bold">

          Employee Dashboard

        </h1>

        <p className="text-gray-500">

          Welcome back!

        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

          {user?.username?.charAt(0).toUpperCase()}

        </div>

        <div>

          <h2 className="font-semibold">

            {user?.username}

          </h2>

          <p className="text-sm text-gray-500">

            Employee

          </p>

        </div>

      </div>

    </div>

  );

}