import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const classes = [
  {
    title: "Handwoven Mat",
    videoUrl: "https://www.youtube.com/embed/U4vRXvF_5mA",
    description: "Learn to weave a simple mat using jute and banana fiber, guided by artisan Kamala from Batticaloa.",
    kitLink: "/product/handwoven-mat-kit",
    kitIncludes: ["Jute rolls", "Banana fiber", "Mini loom", "Scissors", "Thread spool"],
    region: "Eastern Province",
    cultureTag: "🧶 Passed down for 3 generations",
  },
  {
    title: "Clay Incense Holder",
    videoUrl: "https://www.youtube.com/watch?v=4t_rGecnnDw&pp=ygUVc3JpbGFua2FuIGNyYWZ0IGNsYXNz",
    description: "Create a natural incense holder using local red clay from Anuradhapura.",
    kitLink: "/product/clay-kit",
    kitIncludes: ["Red clay", "Shaping sponge", "Wooden tool", "Glazing powder"],
    region: "North Central Province",
    cultureTag: "🏺 Pottery inspired by ancient shrine crafts",
  },
];

export default function CraftClass() {
  return (
    <div className="bg-[#F5ECE3] text-[#5A3821] min-h-screen font-sans">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-10">🎓 Rootsly CraftClass</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-[#6D4C41]">
          Learn authentic Sri Lankan crafts from our talented local artisans. These classes are free for now — all you need is passion and the kit!
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {classes.map((cls, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md border border-[#A67B5B] overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={cls.videoUrl}
                  title={cls.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-[#6D4C41]">{cls.title}</h2>
                <p className="text-[#5A3821]">{cls.description}</p>
                <div className="text-sm font-medium text-[#9C614A]">{cls.cultureTag} · {cls.region}</div>

                <div>
                  <h4 className="font-semibold mb-1">🎒 Kit Includes:</h4>
                  <ul className="list-disc list-inside text-sm">
                    {cls.kitIncludes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={cls.kitLink}
                  className="inline-block mt-4 bg-[#6D8E63] text-white px-5 py-2 rounded-full hover:bg-[#557A4B] transition"
                >
                  🛒 Buy This Kit
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
