// routes/courseRoutes.js
import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addMaterial,
  updateMaterial,
  deleteMaterial
} from "../controller/courseController.js";

const router = express.Router();

// Courses CRUD
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Materials CRUD (nested)
router.post("/:id/materials", addMaterial);
router.put("/:id/materials/:mid", updateMaterial);
router.delete("/:id/materials/:mid", deleteMaterial);

export default router;
