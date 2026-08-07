export default function ManagerStatCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`bg-${color}-500 text-white rounded-2xl shadow-lg p-6`}
    >
      <h3 className="text-lg font-medium">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
}