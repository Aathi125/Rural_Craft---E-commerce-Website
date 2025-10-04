// routes/submissionRoutes.js
import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

// Upload new submission (Base64 in body)
router.post("/:courseId", async (req, res) => {
  try {
    const { fileName, fileData, fileType } = req.body;

    if (!fileName || !fileData || !fileType) {
      return res.status(400).json({ message: "Missing file data" });
    }

    const submission = new Submission({
      courseId: req.params.courseId,
      fileName,
      fileData: Buffer.from(fileData, "base64"), // convert Base64 → Buffer
      fileType,
    });

    await submission.save();
    res.status(201).json({ message: "✅ Submission saved", submission });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get submission by courseId
router.get("/:courseId", async (req, res) => {
  try {
    const submission = await Submission.findOne({ courseId: req.params.courseId });
    if (!submission) return res.json(null);

    res.json({
      id: submission._id,
      fileName: submission.fileName,
      fileType: submission.fileType,
      createdAt: submission.createdAt,
      fileData: submission.fileData.toString("base64"), // send Base64 back
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching submission" });
  }
});

// Delete submission
router.delete("/:id", async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Submission removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting submission" });
  }
});

export default router;
