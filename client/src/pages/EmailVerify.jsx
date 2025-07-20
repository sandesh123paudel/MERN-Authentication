import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const EmailVerify = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const location = useLocation();
  const email = location.state?.email;

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContent);
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paster = e.clipboardData.getData("text");
    const pasteArray = paster.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp, email }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) {
      navigate("/");
    } else if (isLoggedIn && !userData?.isVerified) {
      navigate("/email-verify", { state: { email: userData?.email } });
    } else if (!email) {
      navigate("/login");
    }
  }, [isLoggedIn, userData, email, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="w-28 absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
      />

      <form className="flex flex-col gap-3" onSubmit={onSubmitHandler}>
        <h1 className="text-2xl font-bold">Email Verification OTP</h1>
        <p>
          {" "}
          We have sent you a 6 digit OTP email.
          <br /> Please enter the OTP below:
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center rounded-lg text-xl"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-900 transition duration-200 ease text-white p-2 rounded"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
