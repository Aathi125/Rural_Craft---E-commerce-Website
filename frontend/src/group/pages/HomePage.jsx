import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductSection from "./ProductSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSelector } from "react-redux";


export default function HomePage() {
  const navigate = useNavigate();
   const {  seller } = useSelector((state) => state.sellerState);
  
    const [user, setUser] = useState(null);
    useEffect(() => {
      // Ensure that 'seller' and 'user' are not null or undefined
      if (seller && seller.role) {
        setUser(seller.role);
      } else if (user && user.role) {
        setUser(user.role);
      }
    }, [seller, user]); // Depend on both user and seller
  

  // ✅ Create references for scrolling
  const productSectionRef = useRef(null);
  const ourStoriesRef = useRef(null);

  // ✅ Function to scroll to a section smoothly
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="font-sans bg-gray-100">

      {/* Pass Scroll Functions to Header */}
      <Header scrollToStories={() => scrollToSection(ourStoriesRef)} />

      {/* HERO SECTION */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 bg-gradient-to-br from-[#3B2412] via-[#5A3821] to-[#8C6B52]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30"></div>

        {/* Hero Images */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-[450px] h-[300px] flex justify-center items-center">

            {/* Background Box for Aesthetic Depth */}
            <div className="absolute w-full h-full bg-[#5A3821] rounded-xl shadow-2xl transform rotate-6"></div>

            {/* Main Product Image */}
            <img
              src="https://5.imimg.com/data5/JQ/ZX/OF/SELLER-5765014/coconut-sugar-500x500.jpg"
              alt="Luxury Product"
              className="absolute w-[85%] h-[85%] object-cover rounded-lg shadow-lg transform -rotate-3"
            />

            {/* Decorative Rectangle Behind the Second Image */}
            <div className="absolute top-[-50px] left-[-50px] w-[170px] h-[170px] bg-[#8C6B52] rounded-lg shadow-md transform rotate-[-8deg]"></div>

            {/* Second Image Positioned Over the Rectangle */}
            <img
              src="https://thumbs.dreamstime.com/b/green-cardamom-pods-black-ceramic-bowl-foreground-ingredients-cooking-ayurveda-treatments-aromatic-spices-anise-gloves-170763860.jpg"
              alt="Additional Product"
              className="absolute top-[-40px] left-[-40px] w-[150px] h-[150px] object-cover rounded-lg shadow-md opacity-100 border-2 border-[#D2B48C]"
            />

          </div>
        </div>


        {/* Hero Content */}
        <div className="relative w-full md:w-1/2 text-white text-center md:text-right">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-wide drop-shadow-lg text-[#F5E1C9] font-[Playfair Display]">
            Timeless Traditions. Handcrafted for You.
          </h2>
          <p className="mt-3 text-lg opacity-90 drop-shadow-md text-[#E0C3A6] font-[Lora] italic">
            Bringing Sri Lanka’s Heritage to Your Doorstep.
          </p>
          <button
            onClick={() => scrollToSection(productSectionRef)}
            className="mt-5 px-6 py-3 bg-[#D2B48C] text-black font-semibold rounded-lg hover:bg-[#A37A4B] transition duration-300 shadow-lg border border-[#8C6B52]">
            Shop Now
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div ref={productSectionRef}>
        <ProductSection />
      </div>

      {/* Our Stories Section */}
      <section ref={ourStoriesRef} className="bg-[#9C614A] py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Image with Stylish Border */}
          <img
            src="https://media.istockphoto.com/id/1306698882/photo/sri-lankan-man-portrait.jpg?s=612x612&w=0&k=20&c=tU6ngSMkFp_py670da36fJDsL_-rVjyVLbF-qMuAJmg="
            alt="Siva"
            className="w-48 h-48 rounded-full shadow-lg border-4 border-[#EAD7C5] transform hover:scale-105 transition duration-300"
          />
          {/* Story Content */}
          <div>
            <h2 className="text-5xl font-bold text-[#EAD7C5] mb-4 tracking-wide">
              Our Heritage
            </h2>
            <h3 className="text-2xl font-semibold text-[#F6E2D2] mb-3 italic">
              Crafting the Future with Traditions
            </h3>
            <p className="text-[#F6E2D2] leading-relaxed text-lg">
              In the heart of Sri Lanka, artisans like Siva have been **preserving time-honored crafts**
              for generations. What was once hidden in local markets now shines on a **global platform**,
              allowing families to share their legacy beyond borders. At Rootsly, we celebrate
              these timeless traditions, bringing **handcrafted excellence to your doorstep**.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
