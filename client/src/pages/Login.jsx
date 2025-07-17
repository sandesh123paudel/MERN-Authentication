import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("SignUp");

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="w-28 absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
      />
      <div>
        <h2>{state === "Sign Up" ? "Create Account" : "Login"}</h2>
        <p>
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form action="">
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {state === "Sign Up" ? "Login here" : "Sign up here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
