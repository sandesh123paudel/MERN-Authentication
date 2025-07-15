import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center text-center mt-20 px-4 ">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className=" flex items-center text-xl gap-2 sm:text-3xl font-medium mb-2">
        Hey User
        <img src={assets.hand_wave} className="w-8 aspect-square" />
      </h1>

      <h2 className="text-3xl sm:text-2xl font-semibold mb-4">
        Welcome to MERN-Auth
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Let's get started with your authentication journey! Here you can
        register, login, and manage your account securely.
      </p>
      <button className=" border border-gray-500 py-2.5 px-8 rounded-full hover:bg-gray-100 transition-all mb-5">
        Get Started
      </button>
    </div>
  );
};

export default Header;
