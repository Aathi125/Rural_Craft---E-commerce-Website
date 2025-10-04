// ✅ SellerDashboard with validations from first version
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiUser,
  FiBarChart2,
  FiEdit,
  FiTrash2,
  FiSave,
  FiXCircle,
  FiHome,
  FiBox,
  FiSettings,
  FiTrendingUp,
} from "react-icons/fi";
import { useSelector } from "react-redux";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5551/api/products";
  const APPOINTMENT_API = "http://localhost:5551/api/appointments";

  const storedUser = JSON.parse(localStorage.getItem("sellerdata"));
  const SELLER_ID = storedUser ? storedUser.seller._id : "S12345";

  const [products, setProducts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    sellerId: SELLER_ID,
    category: "",
    price: "",
    stock: "",
    image: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [error, setError] = useState("");

  // Fetch Products and Appointments
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) =>
        setProducts(res.data.filter((p) => p.sellerId === SELLER_ID))
      )
      .catch((err) => console.error(err));

    axios
      .get(`${APPOINTMENT_API}/seller/${SELLER_ID}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Form Handlers
  const handleChange = (e) =>
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  const handleFileUpload = (e) =>
    setNewProduct({ ...newProduct, image: e.target.files[0] });

  // Validation logic from first version
  const validateProduct = () => {
    const { name, category, price, stock, image } = newProduct;

    if (!name.trim() || !category || !price || !stock || !image) {
      alert("All fields (except description) are required.");
      return false;
    }

    if (name.trim().length < 3) {
      alert("Product name must be at least 3 characters long.");
      return false;
    }

    if (isNaN(price) || Number(price) <= 0) {
      alert("Price must be a positive number.");
      return false;
    }

    if (isNaN(stock) || Number(stock) < 0) {
      alert("Stock must be a non-negative number.");
      return false;
    }

    if (Number(stock) > 10000) {
      alert("Stock exceeds maximum limit of 10,000 units.");
      return false;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg","image/webp"];
    if (image && !allowedTypes.includes(image.type)) {
      alert("Only JPG, PNG, and WEBP image formats are allowed.");
      return false;
    }

    return true;
  };

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();
    if (!validateProduct()) {
      
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(newProduct).forEach((key) =>
        formData.append(key, newProduct[key])
      );

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.sellerId === SELLER_ID) {
        setProducts([...products, res.data]);
      }

      setNewProduct({
        name: "",
        description: "",
        sellerId: SELLER_ID,
        category: "",
        price: "",
        stock: "",
        image: null,
      });
      setError("");
      alert("✅ Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product. Please try again.");
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setProducts(products.filter((p) => p._id !== id));
    alert("✅ Product deleted successfully!");
  };

  const editProduct = (index) => {
    setEditingIndex(index);
    setEditedProduct({ ...products[index] });
  };
  const handleEditChange = (e) =>
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  const saveEditedProduct = async () => {
    const res = await axios.put(
      `${API_URL}/${editedProduct._id}`,
      editedProduct
    );
    const updated = [...products];
    updated[editingIndex] = res.data;
    setProducts(updated);
    setEditingIndex(null);
  };

  const handleSearchChange = (e) => setSearchDate(e.target.value);
  const filteredAppointments = appointments.filter((a) =>
    a.date.includes(searchDate)
  );

  const handleDownloadAppointments = () => {
    const header = "Name,Date,Time,Status\n";
    const rows = filteredAppointments.map(
      (a) => `${a.name},${a.date},${a.time},${a.status}`
    );
    const blob = new Blob([header + rows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "appointments_summary.csv";
    link.click();
  };

  // Sidebar buttons
  const sidebarButtons = [
    { label: "Home", icon: <FiHome size={20} />, action: () => navigate("/home") },
    { label: "Products", icon: <FiBox size={20} />, action: () => navigate("/products") },
    { label: "Settings", icon: <FiSettings size={20} />, action: () => navigate("/profile") },
    { label: "Analytics", icon: <FiTrendingUp size={20} />, action: () => navigate("/seller-analytics") },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-20 bg-[#2F4F2F] flex flex-col items-center py-4 space-y-6 text-white">
        {sidebarButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="flex flex-col items-center hover:bg-[#1F3A1F] p-3 rounded"
          >
            {btn.icon}
            <span className="text-xs mt-1">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <div className="flex justify-end space-x-4 mb-6">
          <button
            onClick={() => navigate("/profileseller")}
            className="bg-[#2F4F2F] text-white p-3 rounded-full"
          >
            <FiUser size={22} />
          </button>
          <button
            onClick={() => navigate("/report")}
            className="bg-[#6B8E23] text-white p-3 rounded-full"
          >
            <FiBarChart2 size={22} />
          </button>
        </div>

        {/* Add Product & Product List */}
        <div className="flex gap-6 mb-10">
          {/* Add Product Form */}
          <div className="w-1/2 p-6 bg-white shadow rounded border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={addProduct}>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 w-full mb-2 rounded"
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 w-full mb-2 rounded"
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className="border p-2 w-full mb-2 rounded"
              >
                <option value="">Select Category</option>
                <option value="Handicrafts & Artisanal Products">Handicrafts & Artisanal Products</option>
                <option value="Ayurvedic & Herbal Products">Ayurvedic & Herbal Products</option>
                <option value="Coconut & Coconut based Products">Coconut & Coconut based Products</option>
                <option value="Food & Spices">Food & Spices</option>
                <option value="Earthenware Products">Earthenware Products</option>
              </select>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-2 w-full mb-2 rounded"
              />
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="border p-2 w-full mb-2 rounded"
              />
              <input
                type="file"
                onChange={handleFileUpload}
                className="border p-2 w-full mb-2 rounded"
              />
              {error && <p className="text-red-600 mb-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#2F4F2F] text-white py-2 rounded hover:bg-[#1F3A1F]"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Product Table */}
          <div className="w-1/2 p-6 bg-white shadow rounded border border-gray-300 overflow-auto max-h-[500px]">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <table className="w-full text-sm text-center border">
              <thead className="bg-[#6B8E23] text-white">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className="border-b">
                    {editingIndex === index ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="name"
                            value={editedProduct.name}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="stock"
                            value={editedProduct.stock}
                            onChange={handleEditChange}
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="flex justify-center gap-2">
                          <button onClick={saveEditedProduct}>
                            <FiSave />
                          </button>
                          <button onClick={() => setEditingIndex(null)}>
                            <FiXCircle />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td className="flex justify-center gap-2">
                          <button onClick={() => editProduct(index)}>
                            <FiEdit />
                          </button>
                          <button onClick={() => deleteProduct(product._id)}>
                            <FiTrash2 />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="p-6 bg-white shadow rounded border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Appointments</h2>
          <input
            type="date"
            value={searchDate}
            onChange={handleSearchChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <button
            onClick={handleDownloadAppointments}
            className="bg-[#2F4F2F] text-white py-2 px-4 rounded mb-4 hover:bg-[#1F3A1F]"
          >
            Download Appointments
          </button>
          <div className="overflow-auto max-h-[400px]">
            <table className="w-full text-sm text-center border">
              <thead className="bg-[#6B8E23] text-white">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((a) => (
                  <tr key={a._id} className="border-b">
                    <td>{a.name}</td>
                    <td>{new Date(a.date).toLocaleDateString()}</td>
                    <td>{a.time}</td>
                    <td>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
