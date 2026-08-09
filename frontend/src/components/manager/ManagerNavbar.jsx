export default function ManagerNavbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  return (

    <div className="w-full">

      {/* ======================================================
          Manager Navbar
      ====================================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


        {/* ====================================================
            Dashboard Title
        ==================================================== */}
        <div className="min-w-0 pl-14 sm:pl-0">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
            Manager Dashboard
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Welcome back!
          </p>

        </div>


        {/* ====================================================
            Manager Information
        ==================================================== */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">

          {/* Manager Avatar */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl">

            {user?.username
              ?.charAt(0)
              .toUpperCase()}

          </div>


          {/* Manager Details */}
          <div className="min-w-0">

            <h2 className="font-semibold truncate max-w-[180px] sm:max-w-none">
              {user?.username}
            </h2>

            <p className="text-sm text-gray-500">
              Manager
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}