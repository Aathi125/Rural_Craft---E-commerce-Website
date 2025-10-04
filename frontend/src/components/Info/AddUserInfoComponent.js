// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerUserInfo, clearAuthError } from "../../Actions/userActions";


// export default function AddUserInfoComponent() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.authState);
//   const authState = useSelector((state) => state.authState);

//   const [formData, setFormData] = useState({
//     shippingAddress: "",
//     billingAddress: "",
//     wishlist: "",
//     feedbacks: "",
//     productsInterested: "",
//     notificationPreferences: { email: true, sms: false },
//   });

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userInfoData = {
//       userId: authState.user._id,
//       ...formData,
//     };

//     try {
//       await dispatch(registerUserInfo(userInfoData));
//       toast.success("User info added successfully");
//       navigate("/home"); // Redirect to Home Page after success
//     } catch (err) {
//       toast.error("Failed to add user info");
//     }
//   };

//   // Display error message if error exists
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAuthError());
//     }
//   }, [error, dispatch]);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
//       <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
//         {/* Left Side: Background Image */}
//         <div
//           className="hidden md:block w-1/2 bg-cover bg-center"
//           style={{ backgroundImage: "url('/login.jpg')" }}
//         ></div>

//         {/* Right Side: Add User Info Form */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
//           <h2 className="text-2xl font-bold mb-4">Add User Information</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Shipping Address */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Shipping Address</label>
//               <input
//                 type="text"
//                 placeholder="Shipping Address"
//                 value={formData.shippingAddress}
//                 onChange={(e) =>
//                   setFormData({ ...formData, shippingAddress: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Billing Address */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Billing Address</label>
//               <input
//                 type="text"
//                 placeholder="Billing Address"
//                 value={formData.billingAddress}
//                 onChange={(e) =>
//                   setFormData({ ...formData, billingAddress: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Wishlist */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Wishlist</label>
//               <input
//                 type="text"
//                 placeholder="Wishlist (comma-separated)"
//                 value={formData.wishlist}
//                 onChange={(e) =>
//                   setFormData({ ...formData, wishlist: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Feedbacks */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Feedbacks</label>
//               <input
//                 type="text"
//                 placeholder="Feedbacks"
//                 value={formData.feedbacks}
//                 onChange={(e) =>
//                   setFormData({ ...formData, feedbacks: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>

//             {/* Products Interested */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Products Interested</label>
//               <select
//                 value={formData.productsInterested}
//                 onChange={(e) =>
//                   setFormData({ ...formData, productsInterested: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border rounded-lg"
//               >
//                 <option value="">Select a product category</option>
//                 <option value="Handicrafts & Art">Handicrafts & Art</option>
//                 <option value="Ayurvedic & Herbal Products">Ayurvedic & Herbal Products</option>
//                 <option value="Jewelry & Accessories">Jewelry & Accessories</option>
//                 <option value="Food & Spices">Food & Spices</option>
//                 <option value="Home & Decor">Home & Decor</option>
//               </select>
//             </div>

//             {/* Notification Preferences */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Notification Preferences</label>
//               <div>
//                 <label className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={formData.notificationPreferences.email}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         notificationPreferences: {
//                           ...formData.notificationPreferences,
//                           email: e.target.checked,
//                         },
//                       })
//                     }
//                     className="form-checkbox"
//                   />
//                   <span className="ml-2">Email</span>
//                 </label>
//                 <label className="inline-flex items-center ml-4">
//                   <input
//                     type="checkbox"
//                     checked={formData.notificationPreferences.sms}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         notificationPreferences: {
//                           ...formData.notificationPreferences,
//                           sms: e.target.checked,
//                         },
//                       })
//                     }
//                     className="form-checkbox"
//                   />
//                   <span className="ml-2">SMS</span>
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               {loading ? "Saving..." : "Add User Info"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }