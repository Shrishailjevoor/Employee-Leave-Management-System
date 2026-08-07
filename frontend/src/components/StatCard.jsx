export default function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  return (
    <div className={`${colors[color]} rounded-2xl p-6 text-white shadow-lg`}>
      <h2 className="text-lg font-medium">{title}</h2>
      <h1 className="text-4xl font-bold mt-2">{value}</h1>
    </div>
  );
}