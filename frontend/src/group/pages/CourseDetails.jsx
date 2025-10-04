import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api"; // correct relative path

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course:", err));
  }, [id]);

  if (!course) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="font-sans bg-gray-100">
      {/* HERO SECTION */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 bg-gradient-to-br from-[#3B2412] via-[#5A3821] to-[#8C6B52]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30"></div>

        {/* Hero Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-[400px] h-[260px] flex justify-center items-center">
            <div className="absolute w-full h-full bg-[#5A3821] rounded-xl shadow-2xl transform rotate-6"></div>
            <img
              src="https://img.freepik.com/free-vector/online-education-concept_23-2148522588.jpg"
              alt="Course"
              className="absolute w-[85%] h-[85%] object-cover rounded-lg shadow-lg transform -rotate-3"
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative w-full md:w-1/2 text-white text-center md:text-right">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-wide drop-shadow-lg text-[#F5E1C9] font-[Playfair Display]">
            {course.name}
          </h2>
          <p className="mt-4 text-lg opacity-90 drop-shadow-md text-[#E0C3A6] font-[Lora] italic">
            {course.details}
          </p>
        </div>
      </div>

      {/* MATERIALS SECTION */}
      <section className="py-12 px-6 bg-[#FDF9F5]">
        <h3 className="text-3xl font-bold text-center text-[#5A3821] mb-10">
          📖 Course Materials
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {course.materials.map((m) => (
            <div
              key={m._id}
              className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition"
            >
              <h4 className="text-xl font-bold text-[#8C6B52] mb-2">
                {m.type.toUpperCase()}
              </h4>
              <p className="text-gray-700 mb-3">{m.title}</p>
              <a
                href={m.url.startsWith("http") ? m.url : `https://${m.url}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                {m.url}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 justify-center py-10">
        <button
          onClick={() => navigate("/craft-courses")}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          ⬅️ Back to Craft Courses
        </button>

        <button
          onClick={() => navigate(`/courses/${id}/submission`)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          📑 Submit Submission
        </button>
      </div>
    </div>
  );
}
