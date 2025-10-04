// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   createUserInfo,
//   getUserInfo,
//   updateUserInfo,
//   clearUserInfoErrors,
// } from "../../Actions/userInfoActions";

// export default function UserInfoComponent() {
//   const dispatch = useDispatch();
//   const { userInfo, loading, error } = useSelector((state) => state.userInfoState);
//   const authState = useSelector((state) => state.authState);

//   const [formData, setFormData] = useState({
//     shippingAddress: "",
//     billingAddress: "",
//     wishlist: "",
//     feedbacks: "",
//     productsInterested: "",
//     notificationPreferences: { email: true, sms: false },
//   });

//   // Display error message if error exists
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearUserInfoErrors());
//     }
//   }, [error, dispatch]);

//   // Fetch user info on component mount
//   useEffect(() => {
//     if (authState.user?._id) {
//       dispatch(getUserInfo());
//     }
//   }, [authState.user, dispatch]);

//   // Populate form data if user info exists
//   useEffect(() => {
//     if (userInfo) {
//       setFormData({
//         shippingAddress: userInfo.shippingAddress || "",
//         billingAddress: userInfo.billingAddress || "",
//         wishlist: userInfo.wishlist || "",
//         feedbacks: userInfo.feedbacks || "",
//         productsInterested: userInfo.productsInterested || "",
//         notificationPreferences: userInfo.notificationPreferences || { email: true, sms: false },
//       });
//     }
//   }, [userInfo]);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const userInfoData = {
//       userId: authState.user._id,
//       shippingAddress: formData.shippingAddress,
//       billingAddress: formData.billingAddress,
//       wishlist: formData.wishlist,
//       feedbacks: formData.feedbacks,
//       productsInterested: formData.productsInterested,
//       notificationPreferences: formData.notificationPreferences,
//     };

//     if (userInfo) {
//       dispatch(updateUserInfo(userInfoData))
//         .then(() => toast.success("User info updated successfully"))
//         .catch(() => toast.error("Failed to update user info"));
//     } else {
//       dispatch(createUserInfo(userInfoData))
//         .then(() => toast.success("User info added successfully"))
//         .catch(() => toast.error("Failed to add user info"));
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
//       <div className="w-full max-w-7xl flex bg-white rounded-3xl shadow-lg overflow-hidden h-[90vh]">
//         {/* Left Side: Background Image */}
//         <div
//           className="hidden md:block w-1/2 bg-cover bg-center"
//           style={{ backgroundImage: "url('/login.jpg')" }}
//         ></div>

//         {/* Right Side: User Info Form */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
//           <h2 className="text-2xl font-bold mb-4">User Information</h2>
//           {userInfo ? (
//             <form onSubmit={handleSubmit}>
//               {/* Shipping Address */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Shipping Address</label>
//                 <input
//                   type="text"
//                   placeholder="Shipping Address"
//                   value={formData.shippingAddress}
//                   onChange={(e) =>
//                     setFormData({ ...formData, shippingAddress: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Billing Address */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Billing Address</label>
//                 <input
//                   type="text"
//                   placeholder="Billing Address"
//                   value={formData.billingAddress}
//                   onChange={(e) =>
//                     setFormData({ ...formData, billingAddress: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Wishlist */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Wishlist</label>
//                 <input
//                   type="text"
//                   placeholder="Wishlist (comma-separated)"
//                   value={formData.wishlist}
//                   onChange={(e) =>
//                     setFormData({ ...formData, wishlist: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Feedbacks */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Feedbacks</label>
//                 <input
//                   type="text"
//                   placeholder="Feedbacks"
//                   value={formData.feedbacks}
//                   onChange={(e) =>
//                     setFormData({ ...formData, feedbacks: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Products Interested */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Products Interested</label>
//                 <select
//                   value={formData.productsInterested}
//                   onChange={(e) =>
//                     setFormData({ ...formData, productsInterested: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select a product category</option>
//                   <option value="Handicrafts & Art">Handicrafts & Art</option>
//                   <option value="Ayurvedic & Herbal Products">Ayurvedic & Herbal Products</option>
//                   <option value="Jewelry & Accessories">Jewelry & Accessories</option>
//                   <option value="Food & Spices">Food & Spices</option>
//                   <option value="Home & Decor">Home & Decor</option>
//                 </select>
//               </div>

//               {/* Notification Preferences */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Notification Preferences</label>
//                 <div>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={formData.notificationPreferences.email}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           notificationPreferences: {
//                             ...formData.notificationPreferences,
//                             email: e.target.checked,
//                           },
//                         })
//                       }
//                       className="form-checkbox"
//                     />
//                     <span className="ml-2">Email</span>
//                   </label>
//                   <label className="inline-flex items-center ml-4">
//                     <input
//                       type="checkbox"
//                       checked={formData.notificationPreferences.sms}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           notificationPreferences: {
//                             ...formData.notificationPreferences,
//                             sms: e.target.checked,
//                           },
//                         })
//                       }
//                       className="form-checkbox"
//                     />
//                     <span className="ml-2">SMS</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//               >
//                 {loading ? "Updating..." : "Update User Info"}
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               {/* Shipping Address */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Shipping Address</label>
//                 <input
//                   type="text"
//                   placeholder="Shipping Address"
//                   value={formData.shippingAddress}
//                   onChange={(e) =>
//                     setFormData({ ...formData, shippingAddress: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Billing Address */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Billing Address</label>
//                 <input
//                   type="text"
//                   placeholder="Billing Address"
//                   value={formData.billingAddress}
//                   onChange={(e) =>
//                     setFormData({ ...formData, billingAddress: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Wishlist */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Wishlist</label>
//                 <input
//                   type="text"
//                   placeholder="Wishlist (comma-separated)"
//                   value={formData.wishlist}
//                   onChange={(e) =>
//                     setFormData({ ...formData, wishlist: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Feedbacks */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Feedbacks</label>
//                 <input
//                   type="text"
//                   placeholder="Feedbacks"
//                   value={formData.feedbacks}
//                   onChange={(e) =>
//                     setFormData({ ...formData, feedbacks: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               {/* Products Interested */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Products Interested</label>
//                 <select
//                   value={formData.productsInterested}
//                   onChange={(e) =>
//                     setFormData({ ...formData, productsInterested: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select a product category</option>
//                   <option value="Handicrafts & Art">Handicrafts & Art</option>
//                   <option value="Ayurvedic & Herbal Products">Ayurvedic & Herbal Products</option>
//                   <option value="Jewelry & Accessories">Jewelry & Accessories</option>
//                   <option value="Food & Spices">Food & Spices</option>
//                   <option value="Home & Decor">Home & Decor</option>
//                 </select>
//               </div>

//               {/* Notification Preferences */}
//               <div className="mb-4">
//                 <label className="block text-gray-700">Notification Preferences</label>
//                 <div>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={formData.notificationPreferences.email}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           notificationPreferences: {
//                             ...formData.notificationPreferences,
//                             email: e.target.checked,
//                           },
//                         })
//                       }
//                       className="form-checkbox"
//                     />
//                     <span className="ml-2">Email</span>
//                   </label>
//                   <label className="inline-flex items-center ml-4">
//                     <input
//                       type="checkbox"
//                       checked={formData.notificationPreferences.sms}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           notificationPreferences: {
//                             ...formData.notificationPreferences,
//                             sms: e.target.checked,
//                           },
//                         })
//                       }
//                       className="form-checkbox"
//                     />
//                     <span className="ml-2">SMS</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//               >
//                 {loading ? "Saving..." : "Add User Info"}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }