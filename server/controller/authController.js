import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

//Generate Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//Set Cookie for a token generated
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

//For Registration
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id);
    setTokenCookie(res, token);

    //Sending Welcome Email
    const mailOptions = {
      from: `"MERN-AUTH" <${process.env.EMAIL_ADDRESS}>`,

      to: email,
      subject: "WelCome to MERN-Auth",
      text: `Welcome to MERN-Auth Project.Your account has been craeted successfully with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//For Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and Password Required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.json({ success: true, message: "Logged In successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//For Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ success: true, message: "Logged Out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//For Send Verify OTP
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById({ userId });

    if (user.isVerified) {
      return res.json({ success: false, message: "Account Already Verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: `"VERIFY-ACCOUNT" <${process.env.EMAIL_ADDRESS}>`,

      to: email,
      subject: "Account Verification OTP",
      text: `Your OTP is: ${otp}. Vreify your account with this OTP`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "Verification Code has been successfully sent to the email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//For  Verify Email

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const user = await userModel.findById({ userId });

    if (!user) {
      return res.json({ success: false, message: "User not found " });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
