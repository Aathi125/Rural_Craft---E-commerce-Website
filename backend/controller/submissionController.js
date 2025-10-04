// controller/submissionController.js
import Submission from "../models/Submission.js";

// ✅ Create new submission with Base64 file data
export const createSubmission = async (req, res) => {
  try {
    const file = req.file;
    const { courseId, userName } = req.body;

    console.log("➡️ Received upload:");
    console.log("courseId:", courseId);
    console.log("userName:", userName);
    console.log("file:", file);

    if (!file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64File = file.buffer.toString("base64");

    const newSubmission = new Submission({
      courseId,
      userName,
      fileName: file.originalname,
      fileData: base64File,
      fileType: file.mimetype,
    });

    await newSubmission.save();

    console.log("✅ Submission saved");
    res.status(201).json({ message: "Submission saved", submission: newSubmission });
  } catch (err) {
    console.error("❌ Submission failed:", err.message);
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
};

// ✅ Get all submissions for a course
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ courseId: req.params.courseId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete submission
export const deleteSubmission = async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: "Submission deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
