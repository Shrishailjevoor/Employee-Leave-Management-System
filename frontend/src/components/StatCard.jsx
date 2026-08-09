export default function StatCard({
  title,
  value,
  color,
}) {

  // ============================================================
  // Card Background Colors
  // ============================================================
  const colors = {

    blue: "bg-blue-500",

    yellow: "bg-yellow-500",

    green: "bg-green-500",

    red: "bg-red-500",

  };


  return (

    <div
      className={`
        ${colors[color] || "bg-blue-500"}
        rounded-2xl
        p-5
        sm:p-6
        text-white
        shadow-lg
        w-full
      `}
    >

      {/* Card Title */}
      <p className="text-sm sm:text-base font-medium">
        {title}
      </p>


      {/* Card Value */}
      <p className="text-3xl sm:text-4xl font-bold mt-3 sm:mt-4">
        {value}
      </p>

    </div>

  );

}