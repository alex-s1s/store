// components/Skeleton.js
export default function Skeleton() {
  return (
    <div className="flex flex-wrap gap-5">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="w-52 h-64 bg-gray-200 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );
}