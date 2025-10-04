import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/userActions";
import { toast } from "react-toastify";

export default function ForgotPassword(){

    const [email , setEmail] = useState("");
    const dispatch= useDispatch();
    const {loading , error, message} = useSelector(state => state.authState)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',email);
        dispatch(forgotPassword(formData))
    }

    useEffect(()=>{
        if(message){
            toast(message,{
                type: 'success',
                position : 'bottom-center'
            })
            setEmail("");
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
    },[message,error,dispatch])


    return(
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

              {/* Right Side: Forgot Password Form */}
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center overflow-y-auto">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-4 text-center">Forgot Password</h1>
                <p className="text-center text-brown-600 mb-8">Enter your email to reset your password</p>

                <form onSubmit={submitHandler} className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email_field" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      Enter Email
                    </label>
                    <input
                      type="email"
                      id="email_field"
                      className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Send Email Button */}
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
                        Sending...
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Email
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
}