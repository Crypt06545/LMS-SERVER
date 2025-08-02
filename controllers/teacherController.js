import { clerkClient } from "@clerk/express";
import Course from "../models/Courses.modal.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/PUrchase.model.js";
import User from "../models/User.model.js";

// update the role
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

// add new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const teacherId = req.auth().userId;
    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail Not Attached!" });
    }
    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.teacher = teacherId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();
    res.json({ success: true, message: "Course Added!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get  teacher courses
export const getTeacherCourses = async (req, res) => {
  try {
    const teacher = req.auth().userId;
    const courses = await Course.find({ teacher });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get teacher dashboard data (total earning ,enrolled students , No of courses)
export const teacherDashboardData = async (req, res) => {
  try {
    const teacher = req.auth().userId;

    if (!teacher) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const courses = await Course.find({ teacher });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);

    // calculate total earning from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarning = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // collect unique enrolled students ids with their courses title
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: { totalEarning, enrolledStudentsData, totalCourses },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get enrolledStudents data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const teacher = req.auth().userId;
    if (!teacher) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const courses = await Course.find({ teacher });
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseData: purchase.createdAt,
    }));
    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
