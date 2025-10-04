import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const productSectionRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="font-sans bg-gray-100">
      {/* HERO SECTION */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 bg-gradient-to-br from-[#3B2412] via-[#5A3821] to-[#8C6B52]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30"></div>

        {/* Hero Image */}
        <div className="relative w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <div className="relative w-[420px] h-[280px] flex justify-center items-center">
            <div className="absolute w-full h-full bg-[#5A3821] rounded-xl shadow-2xl transform rotate-6"></div>
            <img
              src="https://img.freepik.com/free-photo/online-courses_53876-123695.jpg"
              alt="Course Banner"
              className="absolute w-[85%] h-[85%] object-cover rounded-lg shadow-lg transform -rotate-3"
            />
          </div>
        </div>

        {/* Hero Text */}
        <div className="relative w-full md:w-1/2 text-white text-center md:text-right">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg text-[#F5E1C9] font-[Playfair Display]">
            Learn. Grow. Succeed.
          </h2>
          <p className="mt-4 text-lg opacity-90 drop-shadow-md text-[#E0C3A6] font-[Lora] italic">
            Explore our craft courses and enhance your skills with RuralCraft.
          </p>
          <button
            onClick={() => scrollToSection(productSectionRef)}
            className="mt-6 px-7 py-3 bg-[#D2B48C] text-black font-semibold rounded-lg hover:bg-[#A37A4B] transition duration-300 shadow-lg border border-[#8C6B52]"
          >
            Browse Courses
          </button>
        </div>
      </div>

      {/* COURSES SECTION */}
      <section ref={productSectionRef} className="py-16 px-6 bg-[#FDF9F5]">
        <h2 className="text-4xl font-bold text-center text-[#5A3821] mb-12">
          📚 Available Courses
        </h2>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {courses.map((c) => (
              <div
                key={c._id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition transform hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold text-[#8C6B52] mb-3">
                  {c.name}
                </h3>
                <p className="text-gray-600 mb-5 line-clamp-3">{c.details}</p>

                <div className="flex justify-center">
                  <Link
                    to={`/courses/${c._id}`}
                    className="px-5 py-2 bg-[#5A3821] text-white font-semibold rounded-lg shadow hover:bg-[#3B2412] transition"
                  >
                    🚀 Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
