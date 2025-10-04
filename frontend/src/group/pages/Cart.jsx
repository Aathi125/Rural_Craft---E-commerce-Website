
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticatedSeller, user } = useSelector((state) => state.authState);

  const IMAGE_BASE_URL = "http://localhost:5551/uploads/";
   const userId = user? user._id : "U001";
 

  const navigate = useNavigate();


  useEffect(() => {
    console.log(user);
    
    axios
      .get(`http://localhost:5551/api/cart?userId=${userId}`)
      .then((res) => {
        const items = res.data
          .map((item) => {
            if (!item.productId) return null;
            return {
              _id: item._id, // cart item id
              productId: item.productId._id,
              name: item.productId.name,
              description: item.productId.description,
              category: item.productId.category,
              image: item.productId.image,
              price: item.productId.price,
              quantity: item.quantity,
              stock: item.productId.stock,
              sellerId: item.sellerId,
            };
          })
          .filter(Boolean); // remove nulls if any productId was missing
        setCartItems(items);
      })
      .catch((err) => console.error("Error loading cart:", err));
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateCartAndStock = (item, newQty) => {
    const stockDiff = newQty - item.quantity;
    const newStock = item.stock - stockDiff;

    if (newStock < 0) {
      alert("Not enough stock available!");
      return;
    }

    axios
      .put(`http://localhost:5551/api/cart/${item._id}`, { quantity: newQty })
      .then(() =>
        axios.put(`http://localhost:5551/api/products/${item.productId}/update-stock`, {
          stock: newStock,
        })
      )
      .then(() => {
        const updated = cartItems.map((i) =>
          i._id === item._id ? { ...i, quantity: newQty, stock: newStock } : i
        );
        setCartItems(updated);
      })
      .catch((err) => console.error("Failed to update cart & stock:", err));
  };

  const increaseQty = (index) => {
    const item = cartItems[index];
    updateCartAndStock(item, item.quantity + 1);
  };

  const decreaseQty = (index) => {
    const item = cartItems[index];
    if (item.quantity > 1) {
      updateCartAndStock(item, item.quantity - 1);
    }
  };

  const deleteItem = (index) => {
    const item = cartItems[index];
    axios
      .delete(`http://localhost:5551/api/cart/${item._id}`)
      .then(() =>
        axios.put(`http://localhost:5551/api/products/${item.productId}/update-stock`, {
          stock: item.stock + item.quantity,
        })
      )
      .then(() => {
        const updated = cartItems.filter((_, i) => i !== index);
        setCartItems(updated);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handlePlaceOrder = () => {
    const totalAmount = calculateTotal();
    const sellerIds = [...new Set(cartItems.map((item) => item.sellerId))];

    navigate("/payment", {
      state: {
        cartItems,
        totalAmount,
        sellerIds,
      },
    });
  };

  // Function to filter cart items based on search query
  const filteredCartItems = cartItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle CSV download for cart summary
  const handleDownloadSummary = () => {
    const header = "Name,Price,Quantity,Total\n";
    const rows = filteredCartItems.map(
      (item) =>
        `${item.name},${item.price},${item.quantity},${(item.price * item.quantity).toLocaleString()}`
    );
    const csvContent = header + rows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cart_summary.csv";
    link.click();
  };

  return (
    <div className="bg-[#F5ECE3] min-h-screen font-sans text-[#5A3821]">
      <Header />
      <div className="max-w-6xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg border border-[#A67B5B]">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-[#6D4C41]">🛒 Your Cart</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-[#A67B5B] rounded-md"
          />
        </div>

        {filteredCartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No items found.</p>
        ) : (
          <div className="space-y-8">
            {filteredCartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-6 border-b border-[#A67B5B] pb-6"
              >
                <img
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md shadow border"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-bold text-[#2F4F2F]">{item.name}</h2>
                  <p className="text-[#8B5E3C]">{item.description}</p>
                  <p className="text-lg font-semibold text-[#9C614A]">
                    LKR {item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-3 mt-2">
                    <button
                      onClick={() => decreaseQty(index)}
                      className="px-3 py-1 bg-[#9C614A] text-white font-bold rounded hover:bg-[#8A5842]"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(index)}
                      className="px-3 py-1 bg-[#9C614A] text-white font-bold rounded hover:bg-[#8A5842]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xl font-bold text-green-700">
                    LKR {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => deleteItem(index)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right text-2xl font-bold text-[#6D4C41] pt-4">
              Total: LKR {calculateTotal().toLocaleString()}
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-[#6D8E63] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#58724E] transition shadow-md"
            >
              ✅ Place Order & Proceed to Payment
            </button>

            {/* Download Cart Summary Button */}
            <button
              onClick={handleDownloadSummary}
              className="mt-6 w-full bg-[#A67B5B] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#8E5B42] transition shadow-md"
            >
              📥 Download Cart Summary
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
