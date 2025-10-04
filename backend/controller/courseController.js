// controller/courseController.js
import Course from "../models/Course.js";

// GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ========== COURSE CRUD ==========
// GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const { name, details, materials } = req.body;
    if (!name || !details) {
      return res.status(400).json({ error: "name and details are required" });
    }
    const course = await Course.create({
      name,
      details,
      materials: Array.isArray(materials) ? materials : [],
    });
    res.status(201).json(course);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const { name, details } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (details !== undefined) update.details = details;

    const course = await Course.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ========== MATERIALS CRUD (nested) ==========

// POST /api/courses/:id/materials
export const addMaterial = async (req, res) => {
  try {
    const { type, title, url } = req.body;
    if (!type || !title || !url) {
      return res.status(400).json({ error: "type, title, and url are required" });
    }
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    course.materials.push({ type, title, url });
    await course.save();
    res.status(201).json(course);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// PUT /api/courses/:id/materials/:mid
export const updateMaterial = async (req, res) => {
  try {
    const { id, mid } = req.params;
    const { type, title, url } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const mat = course.materials.id(mid);
    if (!mat) return res.status(404).json({ error: "Material not found" });

    if (type !== undefined) mat.type = type;
    if (title !== undefined) mat.title = title;
    if (url !== undefined) mat.url = url;

    await course.save();
    res.json(course);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// DELETE /api/courses/:id/materials/:mid
export const deleteMaterial = async (req, res) => {
  try {
    const { id, mid } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const mat = course.materials.id(mid);
    if (!mat) return res.status(404).json({ error: "Material not found" });

    mat.remove();
    await course.save();
    res.json(course);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
