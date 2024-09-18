export function ButtonActivityIndicator() {
  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center pointer-events-none">
      <span className="w-5 h-5 rounded-full animate-spin border-2 border-solid border-white border-t-transparent opacity-50"></span>
    </div>
  );
}

export default function ActivityIndicator() {
  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center pointer-events-none">
      <span className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-black border-t-transparent opacity-25"></span>
    </div>
  );
}
