import React, { useState, useEffect } from "react";
import axios from "axios";

const APPOINTMENT_API = "http://localhost:5551/api/appointments";

export default function BuyerAppointments() {
  const USER_ID = "68d66775b682647ea1628788";

  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    phone: "",
    date: "",
    time: "",
    notes: "",
    location: { address: "", city: "", district: "" },
  });

  // ✅ Fetch user appointments
  useEffect(() => {
    if (!USER_ID) return;
    axios
      .get(`${APPOINTMENT_API}/user/${USER_ID}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const today = new Date().setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter(
    (a) => new Date(a.date).setHours(0, 0, 0, 0) >= today
  );

  const previousAppointments = appointments.filter(
    (a) => new Date(a.date).setHours(0, 0, 0, 0) < today
  );

  const startEditing = (appointment) => {
    if (appointment.status !== "pending") return; // Only pending can edit
    setEditingId(appointment._id);
    setEditForm({
      phone: appointment.phone,
      date: appointment.date.split("T")[0],
      time: appointment.time,
      notes: appointment.notes,
      location: appointment.location || { address: "", city: "", district: "" },
    });
  };

  const saveChanges = async () => {
    try {
      const res = await axios.put(`${APPOINTMENT_API}/${editingId}`, editForm);
      setAppointments(
        appointments.map((a) =>
          a._id === editingId ? { ...a, ...res.data } : a
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`${APPOINTMENT_API}/${id}`);
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };

  const renderAppointmentCard = (appointment) => (
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

      {editingId === appointment._id ? (
        <>
          <div className="space-y-2 text-gray-700">
            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Time</label>
              <input
                type="time"
                value={editForm.time}
                onChange={(e) =>
                  setEditForm({ ...editForm, time: e.target.value })
                }
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Purpose</label>
              <textarea
                value={editForm.notes}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={saveChanges}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-2 text-gray-700">
          <p><strong>Buyer:</strong> {appointment.name}</p>
          <p>
            <strong>Location:</strong> {appointment.location?.address},{" "}
            {appointment.location?.city}, {appointment.location?.district}
          </p>
          <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Phone:</strong> {appointment.phone}</p>
          <p><strong>Purpose:</strong> {appointment.notes || "N/A"}</p>

          {appointment.status === "pending" && (
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => startEditing(appointment)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => cancelAppointment(appointment._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#2F4F2F] text-center mb-8">
        My Appointments
      </h1>

      {/* UPCOMING */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-[#2F4F2F] mb-6 text-center">
          Upcoming Appointments
        </h2>
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500 text-center">No upcoming appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAppointments.map(renderAppointmentCard)}
          </div>
        )}
      </section>

      {/* PREVIOUS */}
      <section>
        <h2 className="text-2xl font-bold text-[#2F4F2F] mb-6 text-center">
          Previous Appointments
        </h2>
        {previousAppointments.length === 0 ? (
          <p className="text-gray-500 text-center">No previous appointments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousAppointments.map(renderAppointmentCard)}
          </div>
        )}
      </section>
    </div>
  );
}
