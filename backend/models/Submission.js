// models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    fileName: { type: String, required: true },
    fileData: { type: Buffer, required: true },   // PDF stored as binary
    fileType: { type: String, required: true },   // MIME type (e.g., "application/pdf")
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
