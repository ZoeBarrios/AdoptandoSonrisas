export default function Loader({ size = "large", isButtonLoader = false }) {
  const loaderSize = isButtonLoader ? "h-6 w-6" : "h-20 w-20";

  return (
    <div
      className={`flex items-center justify-center ${
        isButtonLoader ? "h-auto" : "h-screen"
      }`}
    >
      <div
        className={`animate-spin rounded-full border-t-4 border-b-4 border-blue-500 ${loaderSize}`}
      ></div>
    </div>
  );
}
