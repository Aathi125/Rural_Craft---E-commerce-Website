// components/Profile.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileUserInfo() {
  const { seller } = useSelector((state) => state.sellerState);


  return(
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Seller Profile Content */}
          <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-6">Seller Info</h2>
            <div className="space-y-6">
              {/* Business Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brown-700 border-b border-amber-200 pb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Business Details
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Business Address
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {seller.businessAddress || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Store Location
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {seller.storeLocation || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Business Registration No
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {seller.businessRegistrationNo || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Operations Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brown-700 border-b border-amber-200 pb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Business Operations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      Accepted Payment Methods
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {seller.acceptedPaymentMethods || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Commission Fees
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {seller.commissionFees ? `${seller.commissionFees}%` : "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Product Types Selling
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {seller.productTypesSelling || "Not mentioned"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Customer Reviews
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {seller.customerReviews || "No reviews yet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="mt-8">
              <Link
                to="/updateSellerInfo"
                className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Seller Info
              </Link>
            </div>
          </div>

          {/* Right Side: Background Image */}
          <div className="hidden md:block w-1/2 bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-brown-700/30"></div>
            <div 
              className="h-full w-full bg-cover bg-center" 
              style={{ backgroundImage: "url('/login.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}