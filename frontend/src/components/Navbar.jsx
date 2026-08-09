export default function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  return (

    <div className="w-full">

      {/* ======================================================
          Employee Navbar
      ====================================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* ====================================================
            Dashboard Title
        ==================================================== */}
        <div className="min-w-0 pl-14 sm:pl-0">

          <h1 className="text-2xl sm:text-3xl font-bold break-words">
            Employee Dashboard
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Welcome back!
          </p>

        </div>


        {/* ====================================================
            User Information
        ==================================================== */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">

          {/* User Avatar */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base sm:text-lg">

            {user?.username
              ?.charAt(0)
              .toUpperCase()}

          </div>


          {/* User Details */}
          <div className="min-w-0">

            <h2 className="font-semibold truncate max-w-[180px] sm:max-w-none">
              {user?.username}
            </h2>

            <p className="text-sm text-gray-500">
              Employee
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}