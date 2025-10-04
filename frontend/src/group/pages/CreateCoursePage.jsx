import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreateCoursePage() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const materials = [];

      if (videoTitle && videoUrl) {
        materials.push({ type: "video", title: videoTitle, url: videoUrl });
      }
      if (pdfTitle && pdfUrl) {
        materials.push({ type: "pdf", title: pdfTitle, url: pdfUrl });
      }

      await API.post("/courses", {
        name,
        details,
        materials,
      });

      alert("✅ Course created successfully!");
      navigate("/manage-courses"); // redirect to manage courses
    } catch (err) {
      alert("❌ Error saving course");
    }
  };

  return (
    <div className="font-sans bg-[#FAF7F2] min-h-screen">
      {/* HERO HEADER */}
      <div className="flex flex-col items-center justify-center px-6 md:px-12 py-12 bg-gradient-to-br from-[#3B2412] via-[#5A3821] to-[#8C6B52] text-center">
        <h2 className="text-5xl font-bold text-[#F5E1C9] font-[Playfair Display] drop-shadow-lg">
          ➕ Create a New Course
        </h2>
        <p className="mt-3 text-lg text-[#E0C3A6] italic">
          Add details and materials for your new craft course.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-200"
        >
          {/* Course Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Enter course name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#8C6B52] outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Course Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Course Details
            </label>
            <textarea
              placeholder="Enter course details"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#8C6B52] outline-none"
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          {/* Video Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              🎬 Video Material
            </h3>
            <input
              type="text"
              placeholder="Video Title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Video URL"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          {/* PDF Section */}
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              📄 PDF Material
            </h3>
            <input
              type="text"
              placeholder="PDF Title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
              value={pdfTitle}
              onChange={(e) => setPdfTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="PDF URL"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#5A3821] text-white font-semibold rounded-lg hover:bg-[#3B2412] transition"
          >
            💾 Save Course
          </button>
        </form>
      </div>
    </div>
  );
}
