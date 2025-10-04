// models/Course.js
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  type: String,
  title: String,
  url: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  details: String,
  materials: [materialSchema],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
