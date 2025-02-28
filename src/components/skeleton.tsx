export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );
}