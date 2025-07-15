import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState();
  return (
    <div>
      <img
        src={assets.logo}
        alt=""
        className="w-28 absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
      />
    </div>
  );
};

export default Login;
