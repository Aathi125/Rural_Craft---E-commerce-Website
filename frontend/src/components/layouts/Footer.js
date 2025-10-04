import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons

const Footer = () => {
  return (
    <footer className="bg-[#5A3E36] py-12 px-6 text-center">
      
      {/* Brand Name & Tagline */}
      <h2 className="text-4xl font-bold text-[#EAD7C5] mb-2 tracking-wide">
        RuralCraft Connect
      </h2>
      <p className="text-lg text-[#C49A87] italic">
        Where Culture & Craftsmanship Connect.
      </p>

      {/* Footer Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-8 text-[#F6E2D2]">
        
        <div>
          <h3 className="font-semibold text-xl mb-3 text-[#EAD7C5]">🌿 Explore</h3>
          <Link to="/new-collections" className="hover:text-[#EAD7C5] cursor-pointer transition">New Collections</Link>
          <Link to="/best-sellers" className="hover:text-[#EAD7C5] cursor-pointer transition">Best Sellers</Link>
          <Link to="/handcrafted-picks" className="hover:text-[#EAD7C5] cursor-pointer transition">Handcrafted Picks</Link>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-[#EAD7C5]">📖 Learn More</h3>
          <Link to="/our-story" className="hover:text-[#EAD7C5] cursor-pointer transition">Our Story</Link>
          <Link to="/sustainability" className="hover:text-[#EAD7C5] cursor-pointer transition">Sustainability</Link>
          <Link to="/artisan-partnerships" className="hover:text-[#EAD7C5] cursor-pointer transition">Artisan Partnerships</Link>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-[#EAD7C5]">🛠 Support</h3>
          <Link to="/help-center" className="hover:text-[#EAD7C5] cursor-pointer transition">Help Center</Link>
          <Link to="/returns-exchanges" className="hover:text-[#EAD7C5] cursor-pointer transition">Returns & Exchanges</Link>
          <Link to="/shipping-details" className="hover:text-[#EAD7C5] cursor-pointer transition">Shipping Details</Link>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-3 text-[#EAD7C5]">📞 Contact</h3>
          <Link to="/contact" className="hover:text-[#EAD7C5] cursor-pointer transition">Reach Out</Link>
          <Link to="/privacy-policy" className="hover:text-[#EAD7C5] cursor-pointer transition">Privacy Policy</Link>
          <Link to="/terms-conditions" className="hover:text-[#EAD7C5] cursor-pointer transition">Terms & Conditions</Link>
        </div>

      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-8 mt-10 text-[#EAD7C5] text-2xl">
        <a href="#" className="hover:text-[#C49A87] transition">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="hover:text-[#C49A87] transition">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:text-[#C49A87] transition">
          <i className="fab fa-twitter"></i>
        </a>
      </div>

    </footer>
  );
};

export default Footer;