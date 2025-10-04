import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Home() {
    const navigate = useNavigate(); // Initialize navigate
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to My Website</h1>
        <p className="text-gray-600 mt-2">Homepage will be navigated as th user type</p>
      </header>

      <main className="mt-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={() => navigate('/')}>
          Get Started
        </button >
      </main>

      <footer className="mt-12 text-gray-500">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </footer>
    </div>
  );
}
