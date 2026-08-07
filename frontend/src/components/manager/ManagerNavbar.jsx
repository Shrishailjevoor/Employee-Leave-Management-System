export default function ManagerNavbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

      <div>

        <h1 className="text-4xl font-bold">

          Manager Dashboard

        </h1>

        <p className="text-gray-500">

          Welcome back!

        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl">

          {user?.username?.charAt(0).toUpperCase()}

        </div>

        <div>

          <h2 className="font-semibold">

            {user?.username}

          </h2>

          <p className="text-gray-500">

            Manager

          </p>

        </div>

      </div>

    </div>

  );

}