import { clerkClient } from "@clerk/express";

export const updateRoleTeacher = async (req, res) => {
  try {
    const userId = req.auth().userId; // Changed to use auth() as a function
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "teacher",
      },
    });
    res.json({ success: true, message: "You can Publish a course now" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
