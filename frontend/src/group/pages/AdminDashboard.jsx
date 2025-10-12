import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiDownload, FiHome, FiUsers } from "react-icons/fi";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

export default function UserReport() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5551/api/users")
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const totalUsers = userData.length;
  const activeUsers = userData.filter((u) => u.isActive).length;
  const recentUsers = userData.filter(
    (u) => (new Date() - new Date(u.createdAt)) / (1000 * 3600 * 24) <= 30
  ).length;

  const roleChartData = Object.entries(
    userData.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {})
  ).map(([role, count]) => ({ role, count }));

  const activeStatusData = [
    { name: "Active Users", value: activeUsers, color: "#D9A066" },
    { name: "Inactive Users", value: totalUsers - activeUsers, color: "#6B4226" },
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

  // Light theme classes
  const bgClass = "bg-[#F5EFE6]";
  const textClass = "text-[#3B2F2F]";
  const cardClass = "bg-white text-black";
  const sidebarBg = "bg-[#D9A066]";

  return (
    <div className={`flex min-h-screen ${bgClass} ${textClass}`}>
      {/* Sidebar */}
      <div className={`w-20 ${sidebarBg} flex flex-col items-center py-4 space-y-6`}>
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center hover:bg-[#C18F58] p-3 rounded"
        >
          <FiHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => navigate("/usersdet")}
          className="flex flex-col items-center hover:bg-[#C18F58] p-3 rounded"
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
          <button
            onClick={handleDownload}
            className="bg-[#D9A066] text-[#3B2F2F] px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-[#C18F58]"
          >
            <FiDownload className="mr-2" /> Export
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
            <p>Total Users</p>
          </div>
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold text-[#D9A066]">{activeUsers}</h2>
            <p>Active Users</p>
          </div>
          <div className={`${cardClass} p-6 rounded-lg shadow-md text-center`}>
            <h2 className="text-2xl font-bold text-[#E1C699]">{recentUsers}</h2>
            <p>New Signups (30 days)</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`${cardClass} p-6 rounded-lg shadow-md`}>
            <h2 className="text-xl font-semibold mb-4">📊 Users by Role</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#A37C50" />
                <XAxis dataKey="role" stroke="#3B2F2F" />
                <YAxis stroke="#3B2F2F" />
                <Tooltip />
                <Bar dataKey="count" fill="#D9A066" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={`${cardClass} p-6 rounded-lg shadow-md`}>
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
        </div>

        {/* Table */}
        <div className={`${cardClass} p-6 rounded-lg shadow-md`}>
          <h2 className="text-xl font-semibold mb-4">📋 User Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#D9A066] text-[#3B2F2F]">
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
                    <td className={`border p-2 ${u.isActive ? "text-[#D9A066]" : "text-[#6B4226]"}`}>
                      {u.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="border p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
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
