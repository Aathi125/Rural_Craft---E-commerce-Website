import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiDownload,
  FiUser,
  FiMoon,
  FiSun,
  FiHome,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function UserReport() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5551/api/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Sample derived analytics
  const totalUsers = userData.length;
  const activeUsers = userData.filter((u) => u.isActive).length;
  const recentUsers = userData.filter((u) => {
    const created = new Date(u.createdAt);
    const now = new Date();
    const diffDays = (now - created) / (1000 * 3600 * 24);
    return diffDays <= 30; // joined within last 30 days
  }).length;

  // 📊 Bar Chart - Users per Role
  const roleChartData = Object.entries(
    userData.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {})
  ).map(([role, count]) => ({ role, count }));

  // 📈 Pie Chart - Active vs Inactive
  const activeStatusData = [
    { name: "Active Users", value: activeUsers, color: "#6B8E23" },
    { name: "Inactive Users", value: totalUsers - activeUsers, color: "#FF6347" },
  ];

  const handleDownload = () => {
    const csvHeader = ["Name,Email,Role,Active,Joined On"];
    const csvRows = userData.map(
      (u) =>
        `${u.name},${u.email},${u.role},${u.isActive ? "Yes" : "No"},${new Date(
          u.createdAt
        ).toLocaleDateString()}`
    );

    const csv = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "user_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bgClass = darkMode ? "bg-[#1E1E1E]" : "bg-[#F3F4F6]";
  const textClass = darkMode ? "text-white" : "text-[#2F4F2F]";
  const cardClass = darkMode ? "bg-[#2E2E2E] text-white" : "bg-white text-black";

  return (
    <div className={`flex min-h-screen transition ${bgClass} ${textClass}`}>
      {/* Sidebar */}
      <div className="w-20 bg-[#2F4F2F] flex flex-col items-center py-4 space-y-6 text-white">
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center hover:bg-[#1F3A1F] p-3 rounded"
        >
          <FiHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => navigate("/seller-report")}
          className="flex flex-col items-center hover:bg-[#1F3A1F] p-3 rounded"
        >
          <FiTrendingUp size={20} />
          <span className="text-xs mt-1">Seller</span>
        </button>
        <button
          onClick={() => navigate("/user-report")}
          className="flex flex-col items-center hover:bg-[#1F3A1F] p-3 rounded"
        >
          <FiUsers size={20} />
          <span className="text-xs mt-1">Users</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">👥 User Activity Report</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-[#6B8E23] text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-[#5A731D]"
            >
              <FiDownload className="mr-2" /> Export
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-700"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
            <p>Total Users</p>
          </div>
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold text-green-500">{activeUsers}</h2>
            <p>Active Users</p>
          </div>
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold text-yellow-500">{recentUsers}</h2>
            <p>New Signups (30 days)</p>
          </div>
        </div>

        {/* Bar Chart - Users by Role */}
        <div className={`${cardClass} p-6 rounded-lg shadow-md mb-8`}>
          <h2 className="text-xl font-semibold mb-4">📊 Users by Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6B8E23" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Active/Inactive */}
        <div className={`${cardClass} p-6 rounded-lg shadow-md mb-8`}>
          <h2 className="text-xl font-semibold mb-4">📈 Active vs Inactive Users</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activeStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {activeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* User Table */}
        <div className={`${cardClass} p-6 rounded-lg shadow-md`}>
          <h2 className="text-xl font-semibold mb-4">📋 User Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#6B8E23] text-white">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Active</th>
                  <th className="border p-2">Joined On</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((u, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.role}</td>
                    <td className={`border p-2 ${u.isActive ? "text-green-500" : "text-red-500"}`}>
                      {u.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="border p-2">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
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
