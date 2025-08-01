import express from "express";
import {
  addCourse,
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
export default teacherRouter;


