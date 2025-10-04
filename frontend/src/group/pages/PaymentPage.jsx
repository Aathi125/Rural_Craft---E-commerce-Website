import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaCheckCircle, FaUpload } from "react-icons/fa";

export default function PaymentPage() {
  // Simulated logged-in user data
  const mockUser = {
    fullName: "Thanushkar Raj",
    billingAddress: "No. 45, Rose Villa, Colombo 07",
    shippingAddress: "No. 88, Jasmine Road, Colombo 05",
  };

  const [cheque, setCheque] = useState(null);
  const [preview, setPreview] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    // Auto-fill addresses from mock user
    setBillingAddress(mockUser.billingAddress);
    setShippingAddress(mockUser.shippingAddress);
  }, []);

  const handleChequeChange = (e) => {
    const file = e.target.files[0];
    setCheque(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cheque || !referenceNumber || !billingAddress || !shippingAddress) {
      alert("⚠️ Please complete all required fields.");
      return;
    }
    setSubmitted(true);
    alert("✅ Payment submitted successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-[#F9F5EF] to-[#F1E2D2] min-h-screen text-[#4B2E2B]">
      <Header />

      <div className="max-w-6xl mx-auto mt-16 mb-16 bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden border border-[#D9BFA7]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Form Section */}
          <div className="p-10 bg-[#FFF9F3] relative">
            <h1 className="text-3xl font-extrabold text-[#6D4C41] mb-4">
              🧾 Payment via Cheque
            </h1>
            <p className="text-sm text-[#8B5E3C] mb-4">
              Please upload your cheque and confirm your billing and shipping addresses.
            </p>

            {/* Step Tag */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5E3C] mb-6">
              <span className="bg-[#6D8E63] text-white px-2 py-1 rounded-full shadow">Step 2</span>
              Payment Information
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reference Number */}
              <div>
                <label className="block text-sm font-medium mb-1">Reference Number</label>
                <input
                  type="text"
                  placeholder="e.g. CHQ2024ROOTS"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="w-full border border-[#D9BFA7] rounded-lg px-4 py-3 bg-[#FFF7EF] text-sm focus:ring-2 focus:ring-[#A67B5B] focus:outline-none"
                  required
                />
              </div>

              {/* Billing Address */}
              <div>
                <label className="block text-sm font-medium mb-1">Billing Address</label>
                <textarea
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  rows="2"
                  className="w-full border border-[#D9BFA7] rounded-lg px-4 py-2 bg-[#FFF7EF] text-sm resize-none focus:ring-2 focus:ring-[#A67B5B] focus:outline-none"
                  required
                ></textarea>
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block text-sm font-medium mb-1">Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  rows="2"
                  className="w-full border border-[#D9BFA7] rounded-lg px-4 py-2 bg-[#FFF7EF] text-sm resize-none focus:ring-2 focus:ring-[#A67B5B] focus:outline-none"
                  required
                ></textarea>
              </div>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-[#A67B5B] rounded-xl px-6 py-8 text-center bg-[#FFF4EB] hover:shadow-lg transition-all cursor-pointer">
                <label htmlFor="upload" className="flex flex-col items-center space-y-3 cursor-pointer">
                  <FaUpload size={28} className="text-[#A67B5B]" />
                  <span className="text-sm font-semibold text-[#8B5E3C]">
                    Click or drag to upload cheque
                  </span>
                  <span className="text-xs text-gray-500">JPG / PNG / PDF</span>
                </label>
                <input
                  type="file"
                  id="upload"
                  accept="image/*,.pdf"
                  onChange={handleChequeChange}
                  className="hidden"
                  required
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="mt-4 bg-white border border-[#E0D3C0] rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-medium text-[#6D4C41] mb-2">Preview:</p>
                  <img
                    src={preview}
                    alt="Cheque Preview"
                    className="w-full max-h-[220px] object-contain rounded-md"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#A67B5B] to-[#916847] text-white py-3 text-lg font-semibold rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300"
              >
                Confirm Payment
              </button>
            </form>

            {/* Watermark icon */}
            <div className="absolute bottom-0 right-2 opacity-10 text-[120px] leading-none -z-0 select-none">
              🖋️
            </div>
          </div>

          {/* Right: Visual / Success */}
          <div className="bg-[#FDF3E7] flex flex-col items-center justify-center p-10">
            {submitted ? (
              <div className="text-center animate-fade-in">
                <FaCheckCircle size={60} className="text-green-600 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-[#5A3821] mb-2">Payment Submitted</h2>
                <p className="text-sm text-[#7B5232]">
                  We’ve received your cheque. You’ll get a confirmation once verified.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png"
                  alt="Secure Payment"
                  className="w-36 h-36 mx-auto mb-4"
                />
                <p className="text-md text-[#8B5E3C] font-medium">
                  Verified offline payment. Safe & secure ✨
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
