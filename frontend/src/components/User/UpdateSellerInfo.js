import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfileSeller, clearSellerError } from "../../Actions/sellerActions";

export default function UpdateSellerInfo() {
    const { loading, error, seller, isUpdatedSeller } = useSelector(state => state.sellerState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [storeLocation, setStoreLocation] = useState("");
    const [businessRegistrationNo, setBusinessRegistrationNo] = useState("");
    const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState("");
    const [customerReviews, setCustomerReviews] = useState("");
    const [commissionFees, setCommissionFees] = useState("");
    const [productTypesSelling, setProductTypesSelling] = useState("");

    const dispatch = useDispatch();

 
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('businessName', businessName);
        formData.append('businessAddress', businessAddress);
        formData.append('storeLocation', storeLocation);
        formData.append('businessRegistrationNo', businessRegistrationNo);
        formData.append('acceptedPaymentMethods', acceptedPaymentMethods);
        formData.append('customerReviews', customerReviews);
        formData.append('commissionFees', commissionFees);
        formData.append('productTypesSelling', productTypesSelling);
        
        dispatch(updateProfileSeller(formData));
    };

    useEffect(() => {
        if (seller) {
            setName(seller.name || "");
            setEmail(seller.email || "");
            setBusinessName(seller.businessName || "");
            setBusinessAddress(seller.businessAddress || "");
            setStoreLocation(seller.storeLocation || "");
            setBusinessRegistrationNo(seller.businessRegistrationNo || "");
            setAcceptedPaymentMethods(seller.acceptedPaymentMethods || "");
            setCustomerReviews(seller.customerReviews || "");
            setCommissionFees(seller.commissionFees || "");
            setProductTypesSelling(seller.productTypesSelling || "");
        }

        if (isUpdatedSeller) {
            toast('Seller information updated successfully', {
                type: 'success',
                position: 'bottom-center'
            });
            return;
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                // onOpen: () => { dispatch(clearSellerError) }
            });
            return;
        }
    }, [seller, isUpdatedSeller, error, dispatch]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Update Seller Info Form */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800">Update Seller Information</h2>
                            <p className="text-brown-600 mt-2">Update your business details and seller information</p>
                        </div>

                        {/* Update Seller Info Form */}
                        <form onSubmit={submitHandler} className="space-y-6" encType="multipart/form-data">
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
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Business Name */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="businessName" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    id="businessName"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                />
                            </div>

                            {/* Business Address */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="businessAddress" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    Business Address
                                </label>
                                <input
                                    type="text"
                                    id="businessAddress"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={businessAddress}
                                    onChange={(e) => setBusinessAddress(e.target.value)}
                                />
                            </div>

                            {/* Store Location */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="storeLocation" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Store Location
                                </label>
                                <input
                                    type="text"
                                    id="storeLocation"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={storeLocation}
                                    onChange={(e) => setStoreLocation(e.target.value)}
                                />
                            </div>

                            {/* Business Registration No */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="businessRegistrationNo" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Business Registration No
                                </label>
                                <input
                                    type="text"
                                    id="businessRegistrationNo"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={businessRegistrationNo}
                                    onChange={(e) => setBusinessRegistrationNo(e.target.value)}
                                />
                            </div>

                            {/* Accepted Payment Methods */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="acceptedPaymentMethods" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    Accepted Payment Methods
                                </label>
                                <select
                                    id="acceptedPaymentMethods"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={acceptedPaymentMethods}
                                    onChange={(e) => setAcceptedPaymentMethods(e.target.value)}
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="PayPal">PayPal</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cryptocurrency">Cryptocurrency</option>
                                </select>
                            </div>

                            {/* Commission Fees */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="commissionFees" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Commission Fees (%)
                                </label>
                                <input
                                    type="number"
                                    id="commissionFees"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={commissionFees}
                                    onChange={(e) => setCommissionFees(e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            {/* Product Types Selling */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="productTypesSelling" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Product Types Selling
                                </label>
                                <input
                                    type="text"
                                    id="productTypesSelling"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={productTypesSelling}
                                    onChange={(e) => setProductTypesSelling(e.target.value)}
                                    placeholder="e.g., Handmade, Electronics, Clothing"
                                />
                            </div>

                            {/* Update Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5"
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "UPDATE SELLER INFO"}
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
    );
}