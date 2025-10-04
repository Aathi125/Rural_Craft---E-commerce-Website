import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteMyAccountSeller } from '../../Actions/sellerActions'; // Import the delete action

export default function ProfileSeller() {
    const { seller } = useSelector(state => state.sellerState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            dispatch(deleteMyAccountSeller())
                .then(() => {
                    toast.success('Account deleted successfully', {
                        position: 'bottom-center',
                    });
                    navigate('/'); // Redirect to home page after deletion
                })
                .catch((error) => {
                    toast.error(error || 'Failed to delete account', {
                        position: 'bottom-center',
                    });
                });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
                <div className="flex flex-col md:flex-row">
                    {/* Profile Content */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800">Seller Profile</h2>
                            <p className="text-brown-600 mt-2">Manage your account and access seller tools</p>
                        </div>
                        
                        {/* Profile Avatar */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-brown-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                                <div className="relative bg-white rounded-full p-1">
                                    <img
                                        className="rounded-full w-32 h-32 object-cover"
                                        src={seller.avatar ?? './default.png'}
                                        alt="Profile"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-8 border border-amber-100">
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-brown-800 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Full Name
                                </h4>
                                <p className="text-brown-700 pl-7">{seller.name}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-brown-800 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    Email Address
                                </h4>
                                <p className="text-brown-700 pl-7">{seller.email}</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-brown-800 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Joined Date
                                </h4>
                                <p className="text-brown-700 pl-7">{String(seller.createdAt).substring(0, 10)}</p>
                            </div>
                        </div>

                        {/* Buttons Container */}
                        <div className="space-y-3.5 pb-6">
                            <Link
                                to="/profileseller/update"
                                className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </span>
                            </Link>
                            
                            <Link
                                to="/myprofile/update/passwordSeller"
                                className="w-full bg-gradient-to-r from-brown-600 to-amber-700 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-brown-700 hover:to-amber-800 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Change Password
                                </span>
                            </Link>

                            <Link
                                to="/sellerInfoProfile"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Seller Info
                                </span>
                            </Link>

                            <Link
                                to="/search-buyers"
                                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search Buyers
                                </span>
                            </Link>

                            <Link
                                to="/seller-analytics"
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Reports & Analytics
                                </span>
                            </Link>

                            <button
                                onClick={handleDeleteAccount}
                                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete Account
                                </span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Right Side - Image */}
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
    );
}