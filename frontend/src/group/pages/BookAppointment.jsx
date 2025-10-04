import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BookAppointment() {
  const { productId } = useParams(); // Get productId from URL
  const IMAGE_BASE_URL = "http://localhost:5551/uploads/";
  const APPOINTMENT_API = "http://localhost:5551/api/appointments";
  const USER_ID = "68d66775b682647ea1628788"; // Hardcoded userId for testing

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
    nationality: "Sri Lankan", // Default nationality
    location: {
      address: "",
      city: "",
      district: "",
      coordinates: { lat: "", lng: "" },
    },
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  // ✅ Fetch product details
  useEffect(() => {
    if (!productId) return;
    axios
      .get(`http://localhost:5551/api/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  // ✅ Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  // ✅ Validation
  const validateForm = () => {
    const tempErrors = {};
    const { name, email, phone, date, time } = form;

    if (!name.trim()) tempErrors.name = "Name is required.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Invalid email.";
    if (!phone.match(/^\d{10}$/)) tempErrors.phone = "Phone must be 10 digits.";
    if (!date) tempErrors.date = "Date is required.";
    else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) tempErrors.date = "Cannot choose past date.";
    }
    if (!time) tempErrors.time = "Time is required.";

    setErrors(tempErrors);
    setIsFormValid(Object.keys(tempErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [form]);

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product || !productId) {
      alert("Missing product details.");
      return;
    }

    if (!isFormValid) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(APPOINTMENT_API, {
        ...form,
        productId,
        sellerId: product.sellerId,
        userId: USER_ID,
      });

      alert("✅ Appointment booked successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        notes: "",
        nationality: "Sri Lankan",
        location: {
          address: "",
          city: "",
          district: "",
          coordinates: { lat: "", lng: "" },
        },
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-[#F5ECE3] min-h-screen text-[#5A3821]">
      <Header />

      <div className="max-w-6xl mx-auto mt-12 mb-12 bg-white border border-[#A67B5B] shadow-xl rounded-3xl p-10 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* ✅ Form Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-extrabold text-[#6D4C41] mb-4">📅 Book Your Rootsly Experience</h2>
          {product && (
            <p className="text-[#8B5E3C] mb-6">
              For: <span className="font-semibold">{product.name}</span> (ID: {productId})
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0] ${errors.name ? "border-red-500" : "border-[#A67B5B]"}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0] ${errors.email ? "border-red-500" : "border-[#A67B5B]"}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0] ${errors.phone ? "border-red-500" : "border-[#A67B5B]"}`}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0] ${errors.date ? "border-red-500" : "border-[#A67B5B]"}`}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0] ${errors.time ? "border-red-500" : "border-[#A67B5B]"}`}
                />
                {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label className="block font-medium mb-1">Nationality</label>
              <select
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className="w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0]"
              >
                <option value="Sri Lankan">Sri Lankan</option>
                <option value="Foreigner">Foreigner</option>
              </select>
            </div>

            {/* Location (only for Sri Lankans) */}
            {form.nationality === "Sri Lankan" && (
              <div>
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="address"
                  value={form.location.address}
                  onChange={handleLocationChange}
                  placeholder="Address"
                  className="w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0]"
                />
                <input
                  type="text"
                  name="city"
                  value={form.location.city}
                  onChange={handleLocationChange}
                  placeholder="City"
                  className="w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0] mt-2"
                />
                <input
                  type="text"
                  name="district"
                  value={form.location.district}
                  onChange={handleLocationChange}
                  placeholder="District"
                  className="w-full border-2 rounded-lg px-4 py-2 bg-[#FFF7F0] mt-2"
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block font-medium mb-1">Purpose</label>
              <textarea
                name="notes"
                rows="4"
                value={form.notes}
                onChange={handleChange}
                className="w-full border-2 border-[#A67B5B] rounded-lg px-4 py-2 bg-[#FFF7F0]"
                placeholder="Any special requests or questions..."
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full ${isFormValid ? "bg-[#A67B5B] hover:bg-[#916847]" : "bg-gray-400"} text-white font-bold py-2 px-4 rounded`}
            >
              {loading ? "Booking..." : "Confirm Appointment ✨"}
            </button>
          </form>
        </div>

        {/* ✅ Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          {product ? (
            <>
              <div className="relative bg-[#FDF3E7] p-4 rounded-2xl border border-[#DAB89F] shadow-lg w-[320px] h-[320px]">
                <img
                  src={`${IMAGE_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-2 left-2 bg-[#6D8E63] text-white text-xs px-3 py-1 rounded-full shadow-md">
                  🌿 Rootsly Original
                </div>
              </div>
              <p className="mt-6 text-[#7B5232] italic text-lg text-center font-medium max-w-xs">
                “Inspired by tradition, crafted for your soul.”
              </p>
            </>
          ) : (
            <p className="text-lg text-gray-600">Loading product image...</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
