// components/Profile.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileUserInfo() {
  const { user } = useSelector((state) => state.authState);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Background Image */}
          <div className="hidden md:block w-full md:w-1/3 bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-brown-700/30"></div>
            <div 
              className="h-full w-full bg-cover bg-center" 
              style={{ backgroundImage: "url('/login.jpg')" }}
            ></div>
          </div>

          {/* Right Side: Profile Content */}
          <div className="w-full md:w-2/3 p-8 flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-6">User Info</h2>

            {/* Profile Sections */}
            <div className="space-y-6">
              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brown-700 border-b border-amber-200 pb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Address Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Shipping Address
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {user.shippingAddress || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Billing Address
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {user.billingAddress || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brown-700 border-b border-amber-200 pb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Products Interested
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {user.productsInterested || "None specified"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {user.wishlist || "Empty"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Feedbacks
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {user.feedbacks || "None"}
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notifications
                    </p>
                    <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">
                      {user.notificationPreferences || "Default"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Link
                to="/updateUserInfo"
                className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}