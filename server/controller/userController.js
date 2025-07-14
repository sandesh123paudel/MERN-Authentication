import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const  userId  = req.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    return res.json({
      success: true,
      userData: {
        name: user.name,
        isVerified: user.isVerified,
      },
      message: "User data fetched successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
