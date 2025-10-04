import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const APPOINTMENT_API = "http://localhost:5551/api/appointments";

const SellerAppointments = () => {
  const navigate = useNavigate();
  const { isAuthenticatedSeller } = useSelector((state) => state.sellerState);

  const storedUser = JSON.parse(localStorage.getItem("sellerdata"));
  const SELLER_ID = storedUser ? storedUser.seller._id : null;

  const [appointments, setAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); // Corrected from []

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticatedSeller || !SELLER_ID) {
      navigate("/login");
    }
  }, [isAuthenticatedSeller, SELLER_ID, navigate]);

  // Fetch appointments for logged-in seller
  useEffect(() => {
    if (SELLER_ID) {
      axios
        .get(`${APPOINTMENT_API}/seller/${SELLER_ID}`) // Fixed template string
        .then((res) => setAppointments(res.data))
        .catch((err) => console.error("Error fetching appointments:", err));
    }
  }, [SELLER_ID]);

  // Filter by search date
  const filteredAppointments = appointments.filter((a) =>
    searchDate ? a.date.includes(searchDate) : true
  );

  // Split upcoming / previous
  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingAppointments = filteredAppointments.filter(
    (a) => new Date(a.date).setHours(0, 0, 0, 0) >= today
  );
  const previousAppointments = filteredAppointments.filter(
    (a) => new Date(a.date).setHours(0, 0, 0, 0) < today
  );

  // Update appointment status
  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.patch(`${APPOINTMENT_API}/${id}/status`, { status }); // Fixed template string
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Download CSV function
  const downloadCSV = () => {
    if (!startDate || !endDate) return alert("Please select both start and end dates");

    const filtered = appointments.filter((a) => {
      const appointmentDate = new Date(a.date);
      return appointmentDate >= new Date(startDate) && appointmentDate <= new Date(endDate);
    });

    if (!filtered.length) return alert("No appointments in the selected range");

    const headers = ["Buyer", "Date", "Time", "Location", "Status"];
    const csvRows = [headers.join(",")];

    filtered.forEach((a) => {
      const row = [
        a.name,
        new Date(a.date).toLocaleDateString(),
        a.time,
        `${a.location.address}, ${a.location.city}, ${a.location.district}`, // Fixed template string
        a.status,
      ];
      csvRows.push(row.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments_${startDate}_to_${endDate}.csv`; // Fixed template string
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticatedSeller || !SELLER_ID) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Please Login</h2>
          <p className="text-gray-600">
            You need to be logged in as a seller to view your appointments.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#2F4F2F] text-center mb-8">
        My Appointments
      </h1>

      {/* Date range download */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-3 rounded-md flex-1"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-3 rounded-md flex-1"
        />
        <button
          onClick={downloadCSV}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md"
        >
          Download CSV
        </button>
      </div>

      {/* Date Filter */}
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="border p-3 rounded-md w-full mb-6"
      />

      {/* Upcoming Appointments */}
      <section className="bg-white shadow-lg rounded-lg p-6 mb-10 border border-[#6B8E23]">
        <h2 className="text-2xl font-bold text-[#2F4F2F] mb-6 text-center">
          Upcoming Appointments
        </h2>

        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500 text-center">No upcoming appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg border border-[#6B8E23]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#2F4F2F]">Appointment</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      appointment.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : appointment.status === "confirmed"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-700">
                  <p><strong>Buyer:</strong> {appointment.name}</p>
                  <p>
                    <strong>Location:</strong> {appointment.location.address}, {appointment.location.city}, {appointment.location.district}
                  </p>
                  <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                </div>

                {appointment.status === "pending" && (
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => updateAppointmentStatus(appointment._id, "confirmed")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(appointment._id, "cancelled")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Previous Appointments */}
      <section className="bg-white shadow-lg rounded-lg p-6 border border-[#6B8E23]">
        <h2 className="text-2xl font-bold text-[#2F4F2F] mb-6 text-center">
          Previous Appointments
        </h2>

        {previousAppointments.length === 0 ? (
          <p className="text-gray-500 text-center">No previous appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="p-6 bg-gray-100 rounded-2xl shadow-md border border-gray-300"
              >
                <h3 className="text-lg font-bold text-gray-700 mb-2">Appointment (Past)</h3>
                <p><strong>Buyer:</strong> {appointment.name}</p>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${
                      appointment.status === "confirmed"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerAppointments;
