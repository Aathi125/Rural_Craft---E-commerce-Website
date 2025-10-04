import { Fragment, useEffect, useState } from "react";
import MetaData from '../layouts/MetaData';
import { clearAuthError, login } from "../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch =  useDispatch();
    const navigate =  useNavigate();


    const { loading , error, isAuthenticated } = useSelector(state => state.authState)

    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(login(email,password))
    }

    useEffect(() => {
        if(isAuthenticated ){
            navigate('/send2fa')   
        }

        if(error) {
            toast(error,{
                position : 'bottom-center',
                type : 'error',
                onOpen : ()=>{ dispatch (clearAuthError)}
            })
            return
        }
    },[error,isAuthenticated , dispatch])

   

    return (
        <Fragment>
    <MetaData title={`Login buyer`} />
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Background Image */}
                <div className="hidden md:block w-1/2 bg-cover bg-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-brown-700/30"></div>
                    <div 
                        className="h-full w-full bg-cover bg-center" 
                        style={{ backgroundImage: "url('/login.jpg')" }}
                    ></div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-4">Welcome back Buyer!</h1>
                        <p className="text-brown-600">Enter your Credentials to access your account</p>
                    </div>
                    
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="relative">
                            <label htmlFor="email_field" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email_field"
                                className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password_field" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password_field"
                                className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center">
                            <Link 
                                to="/password/forgot" 
                                className="text-amber-700 hover:text-amber-800 ml-auto text-sm font-semibold transition-colors duration-200 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </div>
                            ) : (
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Login
                                </span>
                            )}
                        </button>

                        <div className="text-center mt-6">
                            <div className="relative py-3">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-amber-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-sm text-brown-600">Don't have an account?</span>
                                </div>
                            </div>
                            
                            <Link 
                                to="/register" 
                                className="inline-block mt-2 text-amber-700 hover:text-amber-800 font-semibold hover:underline transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</Fragment>
    )
}