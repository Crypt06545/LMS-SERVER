import express from "express";
import {
  addCourse,
  getEnrolledStudentsData,
  getTeacherCourses,
  teacherDashboardData,
  updateRoleTeacher,
} from "../controllers/teacherController.js";
import upload from "../configs/multer.js";
import { protectTeacher } from "../middlewares/authMiddleware.js";

const teacherRouter = express.Router();

teacherRouter.get("/update-role", updateRoleTeacher);
teacherRouter.post(
  "/add-course",
  upload.single("image"),
  protectTeacher,
  addCourse
);

teacherRouter.get("/courses", protectTeacher, getTeacherCourses);
teacherRouter.get("/dashboard", protectTeacher, teacherDashboardData);
teacherRouter.get("/enrolled-students", protectTeacher, getEnrolledStudentsData);
export default teacherRouter;
