import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import {updateProfile , clearAuthError} from "../../Actions/userActions"
import { useNavigate } from "react-router-dom";

export default function UpdateUserInfo () {
    const navigate = useNavigate();
    const {loading , error , user , isUpdated} = useSelector(state => state.authState);
    const  [name , setName] = useState("");
    const  [email , setEmail] = useState("");
    const  [avatar , setAvatar] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [notificationPreferences, setNotificationPreferences] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [productsInterested, setProductsInterested] = useState([]);
   

    const dispatch =  useDispatch();

   

    const submitHandler =(e) => {
                e.preventDefault();
                const formData = new FormData ();
                formData.append('name' , name)
                formData.append('email' , email)
                formData.append('avatar' , avatar)
                formData.append("shippingAddress", shippingAddress);
                formData.append("billingAddress", billingAddress);
                formData.append("wishlist", wishlist);
                formData.append("notificationPreferences", notificationPreferences);
                formData.append("feedbacks", feedbacks);
                formData.append("productsInterested", productsInterested);
                dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setShippingAddress(user.shippingAddress || "");  // Default to empty string if not available
            setBillingAddress(user.billingAddress || "");  // Default to empty string if not available
            setWishlist(user.wishlist || []);  // Default to empty array if not available
            setNotificationPreferences(user.notificationPreferences || []);  // Default to empty array if not available
            setFeedbacks(user.feedbacks || []);  // Default to empty array if not available
            setProductsInterested(user.productsInterested || []);
            

        }

        if(isUpdated){
            toast('Profile updated Successfully',{
                type: 'success',
                position : 'bottom-center'
            })
            
            return;
        }

        if(error) {
            toast(error,{
                position : 'bottom-center',
                type : 'error',
                // onOpen : ()=>{ dispatch (clearAuthError)}
            })
            return
                }
    },[user , isUpdated,error])




return(
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Update User Info Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800">Update User Information</h2>
                        <p className="text-brown-600 mt-2">Update your personal information</p>
                    </div>

                    {/* Update User Info Form */}
                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Name Field */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="name_field" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name_field"
                                name="name"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="email_field" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email_field"
                                name="email"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="shipping_address" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Shipping Address
                            </label>
                            <input
                                type="text"
                                id="shipping_address"
                                name="shippingAddress"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={shippingAddress}
                                onChange={e => setShippingAddress(e.target.value)}
                            />
                        </div>

                        {/* Billing Address */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="billing_address" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Billing Address
                            </label>
                            <input
                                type="text"
                                id="billing_address"
                                name="billingAddress"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={billingAddress}
                                onChange={e => setBillingAddress(e.target.value)}
                            />
                        </div>

                        {/* Wishlist */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="wishlist" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Wishlist
                            </label>
                            <textarea
                                id="wishlist"
                                name="wishlist"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={wishlist}
                                onChange={e => setWishlist(e.target.value)}
                                placeholder="Enter items separated by commas"
                            />
                        </div>

                        {/* Notification Preferences */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="notification_preferences" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Notification Preferences
                            </label>
                            <select
                                id="notification_preferences"
                                name="notificationPreferences"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={notificationPreferences}
                                onChange={e => setNotificationPreferences(e.target.value)}
                            >
                                <option value="none">None</option>
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                                <option value="both">Email & SMS</option>
                            </select>
                        </div>

                        {/* Feedbacks */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="feedbacks" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                Feedbacks
                            </label>
                            <textarea
                                id="feedbacks"
                                name="feedbacks"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={feedbacks}
                                onChange={e => setFeedbacks(e.target.value)}
                                placeholder="Enter feedback separated by commas"
                            />
                        </div>

                        {/* Products Interested */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label htmlFor="products_interested" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Products Interested
                            </label>
                            <select
                                id="products_interested"
                                name="productsInterested"
                                className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                value={productsInterested}
                                onChange={e => setProductsInterested(e.target.value)}
                            >
                                <option value="">Select a product category</option>
                                <option value="Handicrafts & Art">Handicrafts & Art</option>
                                <option value="Ayurvedic & Herbal Products">Ayurvedic & Herbal Products</option>
                                <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                                <option value="Food & Spices">Food & Spices</option>
                                <option value="Home & Decor">Home & Decor</option>
                            </select>
                        </div>

                        {/* Update Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "UPDATE INFORMATION"}
                        </button>
                    </form>
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