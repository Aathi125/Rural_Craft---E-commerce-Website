import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { clearAuthError } from "../../Actions/userActions";
import { registerUserInfo } from "../../Actions/userActions";

export default function RegisterUserInfo() {
    const { loading, error, user, isUpdated } = useSelector(state => state.authState);

    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [wishlist, setWishlist] = useState("");
    const [notificationPreferences, setNotificationPreferences] = useState({});
    const [feedbacks, setFeedbacks] = useState("");
    const [productsInterested, setProductsInterested] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('shippingAddress', shippingAddress);
        formData.append('billingAddress', billingAddress);
        formData.append('wishlist', wishlist);
        formData.append('notificationPreferences', JSON.stringify(notificationPreferences));
        formData.append('feedbacks', feedbacks);
        formData.append('productsInterested', productsInterested);

        dispatch(registerUserInfo(formData));
    };

    useEffect(() => {
        if (user) {
            setShippingAddress(user.shippingAddress);
            setBillingAddress(user.billingAddress );
            setWishlist(user.wishlist );
            setNotificationPreferences(user.notificationPreferences || {});
            setFeedbacks(user.feedbacks );
            setProductsInterested(user.productsInterested );
        }

        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                position: 'bottom-center'
            });
            return;
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                // onOpen: () => { dispatch(clearAuthError()); }
            });
            return;
        }
    }, [user, isUpdated, error, dispatch]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
            <div className="w-full max-w-7xl flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
                {/* Left Side: Background Image */}
                <div
                    className="hidden md:block md:w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: "url('/login.jpg')" }}
                ></div>

                {/* Right Side: Add User Info Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
                        Add User Information
                    </h2>
                    <form onSubmit={submitHandler} className="space-y-4">
                        {/* Shipping Address */}
                        <div>
                            <label className="block text-gray-700 font-medium">
                                Shipping Address
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Shipping Address"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={shippingAddress}
                                onChange={e => setShippingAddress(e.target.value)}
                            />
                        </div>

                        {/* Billing Address */}
                        <div>
                            <label className="block text-gray-700 font-medium">
                                Billing Address
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Billing Address"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={billingAddress}
                                onChange={e => setBillingAddress(e.target.value)}
                            />
                        </div>

                        {/* Wishlist */}
                        <div>
                            <label className="block text-gray-700 font-medium">Wishlist</label>
                            <input
                                type="text"
                                placeholder="Enter Wishlist (comma-separated)"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={wishlist}
                                onChange={e => setWishlist(e.target.value)}
                            />
                        </div>

                        {/* Feedbacks */}
                        <div>
                            <label className="block text-gray-700 font-medium">Feedbacks</label>
                            <input
                                type="text"
                                placeholder="Enter Feedbacks"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={feedbacks}
                                onChange={e => setFeedbacks(e.target.value)}
                            />
                        </div>

                        {/* Products Interested */}
                        <div>
                            <label className="block text-gray-700 font-medium">
                                Products Interested
                            </label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={productsInterested}
                                onChange={e => setProductsInterested(e.target.value)}
                            >
                                <option value="">Select a product category</option>
                                <option value="Handicrafts & Artisanal Products">Handicrafts & Artisanal Products</option>
                                <option value="Ayurvedic & Herbal Products">
                                    Ayurvedic & Herbal Products
                                </option>
                                <option value="Coconut & Coconut based Products">Coconut & Coconut based Products</option>
                                <option value="Food & Spices">Food & Spices</option>
                                <option value="Earthenware Products">Earthenware Products</option>
                            </select>
                        </div>

                        {/* Notification Preferences */}
                        <div>
                            <label className="block text-gray-700 font-medium">
                                Notification Preferences
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-blue-600 focus:ring-blue-500"
                                        checked={notificationPreferences.email || false}
                                        onChange={e => setNotificationPreferences(prevState => ({
                                            ...prevState,
                                            email: e.target.checked
                                        }))}
                                    />
                                    <span className="ml-2">Email</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-blue-600 focus:ring-blue-500"
                                        checked={notificationPreferences.sms || false}
                                        onChange={e => setNotificationPreferences(prevState => ({
                                            ...prevState,
                                            sms: e.target.checked
                                        }))}
                                    />
                                    <span className="ml-2">SMS</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Add User Info"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
