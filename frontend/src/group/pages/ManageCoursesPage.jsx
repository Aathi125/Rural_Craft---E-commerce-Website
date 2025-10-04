import { useEffect, useState } from "react";
import API from "../services/api";

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    videoTitle: "",
    videoUrl: "",
    pdfTitle: "",
    pdfUrl: "",
  });

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await API.delete(`/courses/${id}`);
        fetchCourses();
      } catch (err) {
        alert("❌ Error deleting course");
      }
    }
  };

  const handleEdit = (course) => {
    const video = course.materials.find((m) => m.type === "video") || {};
    const pdf = course.materials.find((m) => m.type === "pdf") || {};

    setEditingCourse(course._id);
    setFormData({
      name: course.name,
      details: course.details,
      videoTitle: video.title || "",
      videoUrl: video.url || "",
      pdfTitle: pdf.title || "",
      pdfUrl: pdf.url || "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/courses/${id}`, {
        name: formData.name,
        details: formData.details,
        materials: [
          { type: "video", title: formData.videoTitle, url: formData.videoUrl },
          { type: "pdf", title: formData.pdfTitle, url: formData.pdfUrl },
        ],
      });
      alert("✅ Course updated successfully!");
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      alert("❌ Error updating course");
    }
  };

  return (
    <div className="font-sans bg-[#FAF7F2] min-h-screen">
      {/* HEADER */}
      <div className="text-center py-12 bg-gradient-to-br from-[#3B2412] via-[#5A3821] to-[#8C6B52]">
        <h2 className="text-5xl font-bold text-[#F5E1C9] font-[Playfair Display] drop-shadow-lg">
          ⚙️ Manage Courses
        </h2>
        <p className="mt-3 text-lg text-[#E0C3A6] italic">
          Edit or delete your created courses
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        {courses.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No courses available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition"
              >
                {editingCourse === course._id ? (
                  <>
                    {/* Editable Form */}
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />
                    <textarea
                      value={formData.details}
                      onChange={(e) =>
                        setFormData({ ...formData, details: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <h4 className="font-semibold text-blue-600 mt-2">🎥 Video</h4>
                    <input
                      type="text"
                      placeholder="Video Title"
                      value={formData.videoTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, videoTitle: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={formData.videoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, videoUrl: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <h4 className="font-semibold text-purple-600 mt-2">📄 PDF</h4>
                    <input
                      type="text"
                      placeholder="PDF Title"
                      value={formData.pdfTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, pdfTitle: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="PDF URL"
                      value={formData.pdfUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, pdfUrl: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <button
                      onClick={() => handleUpdate(course._id)}
                      className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-2"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={() => setEditingCourse(null)}
                      className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {/* Normal View */}
                    <h3 className="text-xl font-bold text-[#5A3821] mb-2">
                      {course.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{course.details}</p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        ❌ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
