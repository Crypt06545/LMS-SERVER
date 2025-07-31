import { clerkClient } from "@clerk/express";

export const updateRoleTeacher = async (req,res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "teacher",
      },
    });
    res.json({ success: true, message: "You can Publish a course now" });
  } catch (error) {
    console.log(error);
    resizeBy.json({ success: false, message: error.message });
  }
};
