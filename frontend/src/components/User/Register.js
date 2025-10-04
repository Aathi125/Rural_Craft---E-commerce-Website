import { Fragment, useEffect, useState } from "react";
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { register , clearAuthError } from "../../Actions/userActions";
import { toast } from 'react-toastify';
import { Link,useNavigate } from "react-router-dom";



export default function Register(){


    const [userData , setUserData] = useState({
        name : "",
        email : "",
        password : "",
        shippingAddress : "",
        billingAddress : "",
        wishlist : "",
        notificationPreferences : "",
        feedbacks : "",
        productsInterested : "",
        confirmPassword : ""
        

    });

    const [avatar , setAvatar] = useState();
    const [avatarPreview , setAvatarPreview] = useState("/default.png");
    const dispatch = useDispatch();
    const { loading , error , isAuthenticated } = useSelector (state => state.authState)
    const navigate = useNavigate();

    const onChange  = (e) => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }

        else{
            setUserData({...userData, [e.target.name] : e.target.value})
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData ();
        formData.append('name' , userData.name)
        formData.append('email' , userData.email)
        formData.append('password' , userData.password)
        formData.append('avatar' , avatar)
        formData.append('shippingAddress', userData.shippingAddress);
        formData.append('billingAddress', userData.billingAddress);
        formData.append('wishlist', userData.wishlist);
        formData.append('notificationPreferences', userData.notificationPreferences);
        formData.append('feedbacks', userData.feedbacks);
        formData.append('productsInterested', userData.productsInterested);
        dispatch(register(formData))
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/login');
            return
        }

        if(error) {
            toast(error,{
                position : 'bottom-center',
                type : 'error',
                // onOpen : ()=>{ dispatch (clearAuthError)}
            })
            return
                }

    },[error , isAuthenticated,dispatch,navigate])

    return(
        <Fragment>
            <MetaData title={`Register buyer`} />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden my-8 transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Background Image */}
                    <div className="hidden md:block w-1/2 bg-cover bg-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-brown-700/30"></div>
                        <div 
                            className="h-full w-full bg-cover bg-center" 
                            style={{ backgroundImage: "url('/login.jpg')" }}
                        ></div>
                    </div>
                
                    {/* Right Side: Registration Form */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col overflow-y-auto">
                        <div className="mb-6 text-center">
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-3">Register as a Buyer</h1>
                            <p className="text-brown-600">Create your account to get started</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-5" encType="multipart/form-data">
                            {/* Name Field */}
                            <div className="relative">
                                <label htmlFor="name_field" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Name
                                </label>
                                <input
                                    name="name"
                                    onChange={onChange}
                                    type="text"
                                    id="name_field"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>
                    
                            {/* Email Field */}
                            <div className="relative">
                                <label htmlFor="email_field" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    Email
                                </label>
                                <input
                                    name="email"
                                    onChange={onChange}
                                    type="email"
                                    id="email_field"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                    
                            {/* Password Field */}
                            <div className="relative">
                                <label htmlFor="password_field" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Password
                                </label>
                                <input
                                    name="password"
                                    onChange={onChange}
                                    type="password"
                                    id="password_field"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    placeholder="Enter your password"
                                />
                            </div>

                        {/* Avatar Upload Field */}
                            <div className="relative">
                                <label htmlFor="avatar_upload" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Avatar
                                </label>
                                <div className="flex items-center">
                                    <div className="relative group mr-4">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-brown-600 rounded-full opacity-50 group-hover:opacity-100 blur transition duration-300"></div>
                                        <div className="relative">
                                            <img
                                                src={avatarPreview}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-white bg-white"
                                                alt="Avatar"
                                            />
                                        </div>
                                    </div>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="avatar"
                                            onChange={onChange}
                                            className="hidden"
                                            id="customFile"
                                        />
                                        <label
                                            htmlFor="customFile"
                                            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-brown-600 text-white rounded-lg cursor-pointer hover:from-amber-700 hover:to-brown-700 transition-all duration-300 inline-block"
                                        >
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-amber-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <h2 className="px-4 bg-white text-xl font-semibold text-brown-800">
                                        User Information
                                    </h2>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Shipping Address
                                </label>
                                <input
                                    name="shippingAddress"
                                    type="text"
                                    placeholder="Enter Shipping Address"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Billing Address
                                </label>
                                <input
                                    name="billingAddress"
                                    type="text"
                                    placeholder="Enter Billing Address"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Products Interested
                                </label>
                                <select
                                    name="productsInterested"
                                    onChange={onChange}
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                >
                                    <option value="">Select a product category</option>
                                    <option value="Handicrafts & Art">Handicrafts & Artisanal Products</option>
                                    <option value="Ayurvedic & Herbal Products">Ayurvedic & Herbal Products</option>
                                    <option value="Jewelry & Accessories">Coconut & Coconut based Products</option>
                                    <option value="Food & Spices">Food & Spices</option>
                                    <option value="Home & Decor">Earthenware Products</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    Notification Preferences
                                </label>
                                
                                <div className="grid grid-cols-1 gap-2 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                                    <div className="flex items-center">
                                        <input
                                            id="notification_email"
                                            name="notificationPreferences"
                                            value="email"
                                            type="radio"
                                            onChange={onChange}
                                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                                        />
                                        <label htmlFor="notification_email" className="ml-2 block text-sm text-brown-700">
                                            Email
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="notification_sms"
                                            name="notificationPreferences"
                                            value="sms"
                                            type="radio"
                                            onChange={onChange}
                                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                                        />
                                        <label htmlFor="notification_sms" className="ml-2 block text-sm text-brown-700">
                                            SMS
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="notification_app"
                                            name="notificationPreferences"
                                            value="app"
                                            type="radio"
                                            onChange={onChange}
                                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                                        />
                                        <label htmlFor="notification_app" className="ml-2 block text-sm text-brown-700">
                                            App Notification
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center mt-6"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </div>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        Register
                                    </span>
                                )}
                            </button>
                            
                            <div className="text-center text-sm text-brown-600 mt-6">
                                <p>Already have an account? <Link to="/login" className="text-amber-700 hover:text-amber-800 font-semibold hover:underline transition-colors">Sign In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}