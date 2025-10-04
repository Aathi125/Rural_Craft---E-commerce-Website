import { Fragment, useEffect, useState } from "react";
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { registerSeller , clearSellerError } from "../../Actions/sellerActions";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


export default function RegisterSeller(){

    const [sellerData , setSellerData] = useState({
        name : "",
        email : "",
        password : "",
        businessName : "",
        businessAddress : "",
        storeLocation : "",
        businessRegistrationNo : "",
        acceptedPaymentMethods : "",
        customerReviews : "",
        commissionFees : "",
        productTypesSelling : "",
    });

    const [avatar , setAvatar] = useState();
    const [avatarPreview , setAvatarPreview] = useState("/default.png");
    const dispatch = useDispatch();
    const { loading , error , isAuthenticatedSeller } = useSelector (state => state.sellerState)
    const navigate = useNavigate();


    const onChange  = (e) => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader;
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }

        else{
            setSellerData({...sellerData, [e.target.name] : e.target.value})
        }
    }


     const submitHandler = (e) => {
            e.preventDefault();
            const formData = new FormData ();
            formData.append('name' , sellerData.name)
            formData.append('email' , sellerData.email)
            formData.append('password' , sellerData.password)
            formData.append('avatar' , avatar)
            formData.append('businessName' , sellerData.businessName)
            formData.append('businessAddress' , sellerData.businessAddress)
            formData.append('storeLocation' , sellerData.storeLocation)
            formData.append('businessRegistrationNo' , sellerData.businessRegistrationNo)
            formData.append('acceptedPaymentMethods' , sellerData.acceptedPaymentMethods)
            formData.append('customerReviews' , sellerData.customerReviews)
            formData.append('commissionFees' , sellerData.commissionFees)
            formData.append('productTypesSelling' , sellerData.productTypesSelling)
            dispatch(registerSeller(formData))
        }

            useEffect(()=>{
                if(isAuthenticatedSeller){
                    navigate('/loginSeller');
                    return
                }
        
                if(error) {
                    toast(error,{
                        position : 'bottom-center',
                        type : 'error',
                        // onOpen : ()=>{ dispatch (clearSellerError)}
                    })
                    return
                        }
        
            },[error , isAuthenticatedSeller])

  return(
        <Fragment>
            <MetaData title={`Register Seller`} />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden my-8 transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Registration Form */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col overflow-y-auto">
                        <div className="mb-6 text-center">
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-3">Register as a Seller</h1>
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
                                        Business Information
                                    </h2>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Business Name
                                </label>
                                <input
                                    name="businessName"
                                    type="text"
                                    placeholder="Business Name"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Business Address
                                </label>
                                <input
                                    name="businessAddress"
                                    type="text"
                                    placeholder="Business Address"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Store Location
                                </label>
                                <input
                                    name="storeLocation"
                                    type="text"
                                    placeholder="Store Location"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Business Registration No
                                </label>
                                <input
                                    name="businessRegistrationNo"
                                    type="text"
                                    placeholder="Business Registration No"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    Accepted Payment Methods
                                </label>
                                <input
                                    name="acceptedPaymentMethods"
                                    type="text"
                                    placeholder="Accepted Payment Methods (comma-separated)"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Customer Reviews
                                </label>
                                <input
                                    name="customerReviews"
                                    type="text"
                                    placeholder="Customer Reviews"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Commission Fees
                                </label>
                                <input
                                    name="commissionFees"
                                    type="text"
                                    placeholder="Commission Fees"
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Product Types Selling
                                </label>
                                <select
                                    name="productTypesSelling"
                                    onChange={onChange}
                                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                >
                                    <option value="">Select a product type</option>
                                    <option value="Handicrafts & Artisanal Products">Handicrafts & Artisanal Products</option>
                                    <option value="Ayurvedic & Herbal Products">Ayurvedic & Herbal Products</option>
                                    <option value="Coconut & Coconut based Products">Coconut & Coconut based Products</option>
                                    <option value="Food & Spices">Food & Spices</option>
                                    <option value="Earthenware Products">Earthenware Products</option>
                                </select>
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
                                <p>Already have an account? <Link to="/loginSeller" className="text-amber-700 hover:text-amber-800 font-semibold hover:underline transition-colors">Sign In</Link></p>
                            </div>
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
    </Fragment>
    )
}




