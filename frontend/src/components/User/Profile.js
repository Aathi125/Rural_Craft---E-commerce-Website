// components/Profile.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../../Actions/userActions"; // Import the delete action
import { toast } from "react-toastify";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Delete Account
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      dispatch(deleteMyAccount())
        .then(() => {
          toast.success("Account deleted successfully");
          navigate("/"); // Redirect to home page after deletion
        })
        .catch((error) => {
          toast.error(error || "Failed to delete account");
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Background Image */}
          <div className="hidden md:block w-1/2 bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-brown-700/30"></div>
            <div 
              className="h-full w-full bg-cover bg-center" 
              style={{ backgroundImage: "url('/login.jpg')" }}
            ></div>
          </div>

          {/* Right Side: Profile Content */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center overflow-y-auto">
            {/* Profile Avatar and Edit Button */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-brown-600 rounded-full opacity-70 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative">
                  <img
                    className="rounded-full w-32 h-32 object-cover border-4 border-white bg-white"
                    src={user.avatar}
                    alt="Profile"
                  />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="mt-8 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-brown-700 flex items-center mb-1">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </h4>
                <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">{user.name}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-brown-700 flex items-center mb-1">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Email Address
                </h4>
                <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">{user.email}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-brown-700 flex items-center mb-1">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined Date
                </h4>
                <p className="px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm bg-white/50">{String(user.createdAt).substring(0, 10)}</p>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-4">
                <Link
                  to="/myprofile/update"
                  className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </Link>
                
                <Link
                  to="/myprofile/update/password"
                  className="w-full bg-gradient-to-r from-amber-700 to-brown-700 text-white py-3 rounded-xl text-center block hover:shadow-lg hover:from-amber-800 hover:to-brown-800 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </Link>

                {/* User Info Button */}
                <Link
                  to="/userInfoProfile"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white py-3 rounded-xl text-center block hover:shadow-lg hover:from-amber-600 hover:to-amber-800 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  User Info
                </Link>

                {/* Search Sellers Button */}
                <Link
                  to="/search-sellers"
                  className="w-full bg-gradient-to-r from-amber-400 to-brown-500 text-white py-3 rounded-xl text-center block hover:shadow-lg hover:from-amber-500 hover:to-brown-600 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Sellers
                </Link>

                {/* Delete Account Button */}
                <button
                  onClick={handleDeleteAccount}
                  className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-xl text-center block hover:shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}