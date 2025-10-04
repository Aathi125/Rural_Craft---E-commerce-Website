
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ProductSection() {
  const API_URL = "http://localhost:5551/api/products"; // ✅ Backend API
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch products from backend
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  // ✅ Filter by search
  const filteredCategories = Object.entries(groupedProducts)
    .map(([category, products]) => ({
      category,
      products: products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.products.length > 0);

  const scrollRefs = useRef({});

  return (
    <section className="py-14 px-8 bg-[#EAD7C5] min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-[#8B5E3C] mb-6">
        Handcrafted Treasures
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-1/2">
          <FiSearch className="absolute left-3 top-3 text-[#8B5E3C]" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-[#8B5E3C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C41] text-lg"
          />
        </div>
      </div>

      {/*  Product Listing */}
      <div className="max-w-7xl mx-auto max-h-[700px] overflow-y-auto scrollbar-hide border border-[#C4A484] rounded-2xl p-6 bg-white shadow-xl">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((row, rowIndex) => {
            if (!scrollRefs.current[row.category]) {
              scrollRefs.current[row.category] = React.createRef();
            }
            const scrollRef = scrollRefs.current[row.category];

            return (
              <div key={rowIndex} className="mb-8">
                <h3 className="text-2xl font-semibold text-[#8B5E3C] mb-4">
                   {row.category} 
                </h3>

                <div className="relative">
                  {/* Product List */}
                  <div
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-auto scrollbar-hide p-4"
                  >
                    {row.products.map((product, index) => (
                      <div
                        key={`${rowIndex}-${index}`}
                        className="border rounded-xl p-4 bg-[#FAF3E0] shadow-md transform hover:scale-105 transition duration-300 w-[200px] h-[200px] flex flex-col justify-center items-center cursor-pointer"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        <img
                          src={
                            product.image?.startsWith("http")
                              ? product.image
                              : `http://localhost:5551/uploads/${product.image}`
                          }
                          alt={product.name}
                          className="w-[120px] h-[120px] object-cover mb-2 rounded-md shadow-sm"
                        />
                        <h3 className="text-md font-semibold text-[#8B5E3C]">
                          {product.name}
                        </h3>
                        <p className="text-sm text-green-700 font-bold">
                          LKR {Number(product.price).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-[#8B5E3C] text-xl">
            ❌ No products found for "{searchQuery}"
          </p>
        )}
      </div>
    </section>
  );
}

