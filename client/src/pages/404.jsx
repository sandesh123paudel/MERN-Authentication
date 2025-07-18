import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 text-center">
      <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="border mt-5 border-gray-500 py-2.5 px-8 rounded-full hover:bg-gray-100 transition-all mb-5"
      >
        Go back to Home
      </button>
    </div>
  );
};

export default NotFound;
