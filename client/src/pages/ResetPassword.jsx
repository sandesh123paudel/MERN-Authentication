import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="w-28 absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
      />
      <div>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-gray-600 mt-2 mb-6">
          Enter your email address and <br /> we'll send you instructions to
          reset your password.
        </p>
        <form className="mt-6">
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Reset Link
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
