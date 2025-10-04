import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="font-sans bg-[#FDF9F5] min-h-screen">
      {/* HERO SECTION */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-br from-[#3B2412] via-[#5A3821] to-[#8C6B52]">
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#F5E1C9] drop-shadow-lg font-[Playfair Display]">
            Course Management System
          </h2>
          <p className="mt-4 text-lg text-[#E0C3A6] italic font-[Lora]">
            Create, manage, and review your courses efficiently with RuralCraft.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <Link
              to="/create"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
            >
              ➕ Create New Course
            </Link>
            <Link
              to="/manage"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition font-semibold"
            >
              ⚙️ Manage Courses
            </Link>
          </div>
        </div>

        {/* Banner Image */}
        {/* Banner Image */}
        <div className="absolute right-8 bottom-[-40px] hidden md:block">
          <img
            src="https://img.freepik.com/free-photo/group-people-business-seminar_23-2148892396.jpg
"
            alt="Educator teaching in classroom"
            className="w-[320px] h-[220px] object-cover rounded-lg shadow-lg transform rotate-3 border-4 border-[#F5E1C9]"
          />
        </div>
      </div>

      {/* COURSES SECTION */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-[#5A3821] mb-10">
          📚 All Courses
        </h3>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => (
              <div
                key={c._id}
                className="bg-white border rounded-xl p-6 shadow hover:shadow-xl transition transform hover:scale-[1.02]"
              >
                <h4 className="text-xl font-semibold text-[#5A3821]">
                  {c.name}
                </h4>
                <p className="text-gray-600 mt-2 line-clamp-3">{c.details}</p>

                {/* Materials */}
                <ul className="mt-4 space-y-2 text-sm">
                  {c.materials?.map((m) => (
                    <li key={m._id} className="text-gray-700">
                      <span className="font-semibold text-blue-700">
                        {m.type.toUpperCase()}:
                      </span>{" "}
                      {m.title} —{" "}
                      <a
                        href={m.url.startsWith("http") ? m.url : `https://${m.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {m.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
