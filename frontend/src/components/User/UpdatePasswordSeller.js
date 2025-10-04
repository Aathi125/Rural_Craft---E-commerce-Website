import { useEffect, useState } from "react"
import { toast } from "react-toastify";

import { updatePasswordSeller as updatePasswordSellerAction ,clearSellerError} from "../../Actions/sellerActions";


import { useDispatch, useSelector } from "react-redux";

export default function UpdatePasswordSeller () {

    const [password,setPassword]=useState("");
    const [oldpassword,setOldPassword]=useState("");
    const dispatch = useDispatch();
    const {isUpdatedSeller , error} = useSelector(state => state.sellerState)
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword',oldpassword)
        formData.append('password',password)
        dispatch(updatePasswordSellerAction(formData))
    }

    useEffect(() =>{
        if(isUpdatedSeller){
                toast('Password updated Successfully',{
                    type: 'success',
                    position : 'bottom-center'
                })

                setOldPassword("");
                setPassword("")
                return;
            }

               
            if(error) {
                toast(error,{
                    position : 'bottom-center',
                    type : 'error',
                    // onOpen : ()=>{ dispatch (clearSellerError)}
                })
                return
                    }

    },[isUpdatedSeller, error ,dispatch])


    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Update Password Form */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800">Update Password</h2>
                            <p className="text-brown-600 mt-2">Change your password securely</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* Old Password Field */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="old_password_field" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={oldpassword}
                                    onChange={e=>setOldPassword(e.target.value)}
                                />
                            </div>

                            {/* New Password Field */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="new_password_field" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}
                                />
                            </div>

                            {/* Update Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Update Password
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