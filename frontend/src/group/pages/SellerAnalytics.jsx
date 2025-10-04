import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { FiHome, FiBox, FiSettings, FiTrendingUp, FiDownload } from "react-icons/fi";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const COLORS = ['#8B4513','#A0522D','#D2691E','#CD853F','#DEB887','#D2B48C','#BC8F8F','#F4A460'];

export default function SellerAnalyticsDashboard() {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState({
    buyerInterests: [],
    categoryDistribution: [],
    notificationPreferences: [],
    productInterestCount: [],
    buyerDemographics: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const buyerDemographicsRef = useRef();

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/v1/seller-analytics");
      if (!response.data || !response.data.success) throw new Error("Failed to get analytics data");

      // Process category distribution if not provided
      const data = response.data.analyticsData;
      if (!data.categoryDistribution || data.categoryDistribution.length === 0) {
        const categoryCounts = {};
        (data.buyerInterests || []).forEach(item => {
          const category = item.productName.split(" - ")[0] || "Uncategorized";
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        data.categoryDistribution = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
      }

      setAnalyticsData(data);
    } catch (err) {
      console.error(err);
      const msg = err.response?.status === 404
        ? "Please make sure you are logged in as a seller"
        : err.response?.status === 401
        ? "Please log in to access this page"
        : "Error fetching analytics data";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintPDF = () => {
    const opt = {
      margin: 1,
      filename: "buyer-demographics-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" }
    };
    html2pdf().set(opt).from(buyerDemographicsRef.current).save()
      .then(() => toast.success("PDF generated successfully!"))
      .catch(() => toast.error("Failed to generate PDF"));
  };

  const sidebarButtons = [
    { label: "Home", action: () => navigate("/home"), icon: <FiHome size={20} /> },
    { label: "Products", action: () => navigate("/products"), icon: <FiBox size={20} /> },
    { label: "Settings", action: () => navigate("/profile"), icon: <FiSettings size={20} /> },
    { label: "Analytics", action: () => navigate("/seller-analytics"), icon: <FiTrendingUp size={20} /> }
  ];

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-center"><div><h2 className="text-2xl font-bold mb-4">Error</h2><p className="mb-4">{error}</p><button onClick={fetchAnalyticsData} className="px-4 py-2 bg-brown-600 text-white rounded">Retry</button></div></div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-20 bg-[#2F4F2F] flex flex-col items-center py-4 space-y-6 text-white">
        {sidebarButtons.map(btn => (
          <button key={btn.label} onClick={btn.action} className="flex flex-col items-center hover:bg-[#1F3A1F] p-3 rounded">
            {btn.icon}
            <span className="text-xs mt-1">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Seller Analytics & Reports</h1>

        {/* Buyer Interests */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Buyer Interests</h2>
          {analyticsData.buyerInterests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {analyticsData.buyerInterests.map((item, idx) => (
                <div key={idx} className="p-2 border rounded bg-amber-50">
                  <p className="font-semibold">{item.buyerName}</p>
                  <p className="text-amber-600">{item.productName}</p>
                </div>
              ))}
            </div>
          ) : <p>No buyer interests found</p>}
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Category Distribution</h2>
          {analyticsData.categoryDistribution.length > 0 ? (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categoryDistribution}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                  >
                    {analyticsData.categoryDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <p>No category distribution data</p>}
        </div>

        {/* Product Interest Count */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Product Interest Count</h2>
          {analyticsData.productInterestCount.length > 0 ? (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.productInterestCount}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8B4513" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : <p>No product interest data</p>}
        </div>

        {/* Buyer Demographics */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Buyer Demographics</h2>
            {analyticsData.buyerDemographics.length > 0 && (
              <button onClick={handlePrintPDF} className="flex items-center bg-[#2F4F2F] text-white px-3 py-1 rounded hover:bg-[#1F3A1F]">
                <FiDownload className="mr-1" /> Download PDF
              </button>
            )}
          </div>
          {analyticsData.buyerDemographics.length > 0 ? (
            <div ref={buyerDemographicsRef} className="overflow-auto max-h-96">
              <table className="min-w-full border text-left">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-2 py-1 border">Name</th>
                    <th className="px-2 py-1 border">Email</th>
                    <th className="px-2 py-1 border">Address</th>
                    <th className="px-2 py-1 border">Products Interested</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.buyerDemographics.map((b, idx) => (
                    <tr key={idx} className="hover:bg-amber-50">
                      <td className="px-2 py-1 border">{b.name}</td>
                      <td className="px-2 py-1 border">{b.email}</td>
                      <td className="px-2 py-1 border">{b.shippingAddress}</td>
                      <td className="px-2 py-1 border">{b.productInterested}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p>No buyer demographics data</p>}
        </div>
      </div>
    </div>
  );
}
