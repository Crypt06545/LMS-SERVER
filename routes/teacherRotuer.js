import express from "express";
import { updateRoleTeacher } from "../controllers/teacherController.js";

const teacherRouter = express.Router();

teacherRouter.get("/update-role", updateRoleTeacher);

export default teacherRouter;
