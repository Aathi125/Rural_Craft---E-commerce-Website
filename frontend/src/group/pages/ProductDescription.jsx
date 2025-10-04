import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

export default function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = `http://localhost:5551/api/products/${id}`;
  const IMAGE_BASE_URL = "http://localhost:5551/uploads/";

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const {  user } = useSelector((state) => state.authState);

  const userId = user? user._id : "U001";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center text-xl font-semibold mt-10">Loading...</p>;
  }

  //  Stock status indicator logic
  const stockStatus =
    product.stock > 20
      ? { text: "In Stock", dot: "bg-green-600" }
      : product.stock > 0
      ? { text: "Low Stock", dot: "bg-yellow-500" }
      : { text: "Out of Stock", dot: "bg-red-600" };

  //  Handle quantity adjustment
  const handleQuantityChange = (type) => {
    if (type === "increase") {
      if (quantity < product.stock) {
        setQuantity(quantity + 1);
      } else {
        alert("You've reached the available stock limit.");
      }
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //  Add to cart and update stock logic
  const handleAddToCart = () => {
    if (product.stock === 0) {
      alert("This product is currently out of stock.");
      return;
    }

    if (quantity > product.stock) {
      alert("Not enough stock available!");
      return;
    }

    axios
      .post("http://localhost:5551/api/cart", {
        productId: product._id,
        sellerId: product.sellerId,
        userId,
        quantity,
      })
      .then(() =>
        axios.put(`http://localhost:5551/api/products/${id}/update-stock`, {
          stock: product.stock - quantity,
        })
      )
      .then(() => {
        setProduct({ ...product, stock: product.stock - quantity });
        navigate("/cart");
      })
      .catch((err) => {
        console.error("Stock update failed:", err);
        alert("Something went wrong. Try again.");
      });
  };

  return (
    <div className="font-sans bg-[#F5ECE3] min-h-screen text-[#5A3821]">
      <Header />

      <div className="max-w-6xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-10 border border-[#A67B5B] flex flex-col md:flex-row gap-12 items-center">
        {/* Image */}
        <div className="relative w-[400px] h-[400px] bg-opacity-30 bg-[#EAD7C5] backdrop-blur-md rounded-xl shadow-lg border border-[#A67B5B] p-4">
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute top-4 left-4 bg-[#A67B5B] text-white text-sm px-3 py-1 rounded-full shadow-md">
            🌿 Handmade & Organic
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-[#6D4C41]">{product.name}</h1>

          <div className="flex items-center space-x-2 text-lg font-medium">
            <span className={`w-3 h-3 rounded-full ${stockStatus.dot}`} />
            <span>{stockStatus.text}</span>
          </div>

          <p className="text-3xl font-semibold text-[#9C614A]">LKR {product.price}</p>

          {/* Quantity */}
          {product.stock > 0 && (
            <div className="mt-4">
              <label className="block text-lg font-medium">Quantity</label>
              <div className="flex items-center mt-2 border-2 border-[#A67B5B] rounded-md w-fit bg-[#F5ECE3]">
                <button
                  className="px-4 py-2 bg-[#9C614A] text-white text-lg font-bold hover:bg-[#8A5842]"
                  onClick={() => handleQuantityChange("decrease")}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-none text-lg font-semibold bg-transparent text-[#5A3821]"
                />
                <button
                  className="px-4 py-2 bg-[#9C614A] text-white text-lg font-bold hover:bg-[#8A5842]"
                  onClick={() => handleQuantityChange("increase")}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            className={`w-full text-white py-3 text-lg font-semibold rounded-lg transition duration-300 shadow-md ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6D8E63] hover:bg-[#58724E]"
            }`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            🛒 {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Book Appointment
          <button className="w-full bg-[#A67B5B] text-white py-3 text-lg font-semibold rounded-lg hover:bg-[#916847] transition shadow-md">
            📅 Book Appointment
          </button> */}

          {/* Book Appointment */}
               <button
                 onClick={() => navigate(`/product/${product._id}/book-appointment`)}
                  className="w-full bg-[#A67B5B] text-white py-3 text-lg font-semibold rounded-lg hover:bg-[#916847] transition shadow-md"
                    >
                   📅 Book Appointment
                   </button>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-[#6D4C41]">
            {product.description}
          </p>

          {/* Badges */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="bg-[#6D8E63] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md">
              🚚 Free Shipping
            </div>
            <div className="bg-[#A67B5B] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md">
              ✅ Artisan Quality
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
