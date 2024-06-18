
// Not found page 
function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
