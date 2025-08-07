import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 text-amber-900">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-6 text-lg text-amber-700">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
