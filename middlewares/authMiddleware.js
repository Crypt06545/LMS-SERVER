import { clerkClient } from "@clerk/express";

// protect teacher route
export const protectTeacher = async (req, res, next) => {
  try {
    const userId = req.auth().userId;
    const response = await clerkClient.users.getUser(userId);
    if (response.publicMetadata.role !== "teacher") {
      return res.json({ success: false, message: "Unauthorized Access!!" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
