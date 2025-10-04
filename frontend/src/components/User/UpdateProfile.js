import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import {updateProfile , clearAuthError} from "../../Actions/userActions"

export default function UpdateProfile () {
    const {loading , error , user , isUpdated} = useSelector(state => state.authState);
    const  [name , setName] = useState("");
    const  [email , setEmail] = useState("");
    const  [avatar , setAvatar] = useState("");
    const  [avatarPreview , setAvatarPreview] = useState("/default.png");

    const dispatch =  useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader;
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])
    }

    const submitHandler =(e) => {
                e.preventDefault();
                const formData = new FormData ();
                formData.append('name' , name)
                formData.append('email' , email)
                formData.append('avatar' , avatar)
                dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            if(user.avatar){
                setAvatarPreview(user.avatar)
            }

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
                {/* Left Side: Update Profile Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800">Update Profile</h2>
                        <p className="text-brown-600 mt-2">Update your profile information</p>
                    </div>

                    {/* Update Profile Form */}
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

                        {/* Avatar Upload Field */}
                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                            <label className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Profile Picture
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-brown-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                                    <div className="relative bg-white rounded-full p-1">
                                        <img
                                            src={avatarPreview}
                                            className="w-24 h-24 rounded-full object-cover"
                                            alt="Avatar Preview"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="hidden"
                                        id="customFile"
                                        onChange={onChangeAvatar}
                                    />
                                    <label
                                        htmlFor="customFile"
                                        className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-2.5 px-4 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        Choose New Picture
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Update Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "UPDATE PROFILE"}
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