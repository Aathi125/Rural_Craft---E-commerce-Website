import React from "react";
import Header from "../components/Header";

export default function ContactUs() {
  return (
    <div className="font-sans bg-[#F5ECE3] min-h-screen text-[#5A3821]">
      <Header />

      {/* Full-Size Image Background */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://www.india.com/wp-content/uploads/2018/08/Sri-Lanka-photo-1.jpg')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-10">
          <h2 className="text-5xl font-extrabold text-[#fff] mb-6">
            🌱 Get In Touch With Us
          </h2>
          <p className="text-xl mb-6">We’d love to hear from you! 💬</p>

          <div className="space-y-5 max-w-md mx-auto text-lg">
            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="font-semibold">Our Office</h3>
              <p>123 RuralCraft St, Colombo, Sri Lanka</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Email Us</h3>
              <p>contact@ruralCraft.com</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Call Us</h3>
              <p>+94 123 456 789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
