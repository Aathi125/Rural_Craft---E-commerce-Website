import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiDownload, FiUser, FiMoon, FiSun,
  FiHome, FiBox, FiSettings, FiTrendingUp
} from "react-icons/fi";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function SellerReport() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("sellerdata"));
  const sellerId = storedUser ? storedUser.seller._id : "S12345";

  useEffect(() => {
    axios.get("http://localhost:5551/api/products")
      .then((res) => {
        const filtered = res.data.filter((p) => p.sellerId === sellerId);
        setProductData(filtered);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // 📊 Bar Chart Data
  const stockChartData = productData.map((p) => ({
    name: p.name.length > 20 ? p.name.slice(0, 20) + "…" : p.name,
    stock: p.stock,
  }));

  const stockStatusData = [
    {
      name: "✅ Available",
      value: productData.filter((p) => p.stock >= 10).length,
      color: "#6B8E23",
    },
    {
      name: "⚠️ Low Stock",
      value: productData.filter((p) => p.stock > 0 && p.stock < 10).length,
      color: "#FFC107",
    },
    {
      name: "❌ Out of Stock",
      value: productData.filter((p) => p.stock === 0).length,
      color: "#FF6347",
    },
  ];

  const handleDownload = () => {
    const csvHeader = ["Product Name,Category,Price,Stock,Status"];
    const csvRows = productData.map((p) => {
      const status =
        p.stock === 0 ? "Out of Stock" : p.stock < 10 ? "Low Stock" : "Available";
      return `${p.name},${p.category},${p.price},${p.stock},${status}`;
    });

    const csv = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "stock_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bgClass = darkMode ? "bg-[#1E1E1E]" : "bg-[#F3F4F6]";
  const textClass = darkMode ? "text-white" : "text-[#2F4F2F]";
  const cardClass = darkMode ? "bg-[#2E2E2E] text-white" : "bg-white text-black";

  // Sidebar buttons
  const sidebarButtons = [
    { label: "Home", icon: <FiHome size={20} />, action: () => navigate("/home") },
    { label: "Products", icon: <FiBox size={20} />, action: () => navigate("/products") },
    { label: "Settings", icon: <FiSettings size={20} />, action: () => navigate("/profile") },
    { label: "Analytics", icon: <FiTrendingUp size={20} />, action: () => navigate("/seller-analytics") },
  ];

  return (
    <div className={`flex min-h-screen transition ${bgClass} ${textClass}`}>
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
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📦 Seller Stock Report</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-[#6B8E23] text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-[#5A731D]"
            >
              <FiDownload className="mr-2" /> Export
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="bg-[#2F4F2F] text-white p-3 rounded-full hover:bg-[#1F3A1F]"
            >
              <FiUser size={22} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-700"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>

        {/* 🚨 Alerts */}
        {(productData.some(p => p.stock === 0) || productData.some(p => p.stock <= 5)) && (
          <div className={`${cardClass} p-5 mb-6 rounded-lg shadow border-l-4 border-red-600`}>
            <h2 className="text-lg font-bold text-red-500 mb-2">🚨 Critical Stock Alerts</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {productData
                .filter((p) => p.stock === 0 || p.stock <= 5)
                .map((p, i) => (
                  <li key={i}>
                    {p.name} —{" "}
                    <span className={p.stock === 0 ? "text-red-600" : "text-yellow-500"}>
                      {p.stock === 0 ? "Out of Stock" : `Only ${p.stock} left`}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold">{productData.length}</h2>
            <p>Total Products</p>
          </div>
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold text-yellow-500">
              {productData.filter((p) => p.stock > 0 && p.stock < 10).length}
            </h2>
            <p>Low Stock</p>
          </div>
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold text-red-600">
              {productData.filter((p) => p.stock === 0).length}
            </h2>
            <p>Out of Stock</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className={`${cardClass} p-6 rounded-lg shadow-md mb-8`}>
          <h2 className="text-xl font-semibold mb-4">📊 Stock Levels</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockChartData} margin={{ top: 20, right: 30, left: 10, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#6B8E23" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className={`${cardClass} p-6 rounded-lg shadow-md mb-8`}>
          <h2 className="text-xl font-semibold mb-4">📈 Stock Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stockStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {stockStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Product Table */}
        <div className={`${cardClass} p-6 rounded-lg shadow-md`}>
          <h2 className="text-xl font-semibold mb-4">📋 Product Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#6B8E23] text-white">
                <tr>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Price (LKR)</th>
                  <th className="border p-2">Stock</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((p, index) => {
                  const status =
                    p.stock === 0 ? "❌ Out of Stock" : p.stock < 10 ? "⚠️ Low Stock" : "✅ Available";
                  const statusColor =
                    p.stock === 0 ? "text-red-600" : p.stock < 10 ? "text-yellow-600" : "text-green-600";

                  return (
                    <tr key={index} className="text-center">
                      <td className="border p-2">{p.name}</td>
                      <td className="border p-2">{p.category}</td>
                      <td className="border p-2">{p.price.toLocaleString()}</td>
                      <td className="border p-2">{p.stock}</td>
                      <td className={`border p-2 font-semibold ${statusColor}`}>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
