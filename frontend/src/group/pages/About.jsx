
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";



export default function About() {
  return (
    <div className="relative min-h-screen">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75 z-0"
        style={{
          backgroundImage:
            "url('https://www.picsofasia.com/wp-content/uploads/2018/04/photogrpahy-tour-sri-lanka.jpg')",
        }}
      ></div>

      {/* Page Content */}
      <div className="relative z-10">
        <Header />

        <div className="max-w-6xl mx-auto px-6 py-20 text-white">
          <h1 className="text-5xl font-bold mb-6 text-center">Our Story</h1>
          <p className="text-xl text-center mb-12">
            <span className="text-yellow-300 font-semibold">RuralCraft</span> empowers Sri Lankan vendors by merging technology with tradition.
            Our mission: amplify IT value, uplift rural vendors, and preserve our cultural identity through every product.
          </p>

          {/* Mini-Story Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {["Anuradhapura", "Jaffna", "Matara"].map((region, i) => (
              <div key={i} className="bg-white/20 p-6 rounded-xl backdrop-blur-md border border-white/30 shadow-xl">
                <h3 className="text-xl font-bold text-yellow-100 mb-2">{region} Artisan</h3>
                <p className="text-sm text-white">
                  "I craft traditional goods in {region} — RuralCraft helped me connect with the world while honoring my heritage."
                </p>
              </div>
            ))}
          </div>

          {/* 🌍 Innovative Section: Roots Map */}
          <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-lg shadow-2xl">
            <h2 className="text-3xl font-bold text-yellow-200 mb-4 text-center">🗺️ Discover Our Roots Map</h2>
            <p className="text-center text-white mb-6">
              Explore Sri Lanka through its artisans. Hover, click, and shop stories from across the island.
            </p>
            <div className="w-full h-96 bg-black/30 rounded-xl flex items-center justify-center text-white text-lg">
              {/* Replace this with actual interactive map later */}
              🌍 [Interactive Map Coming Soon]
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
