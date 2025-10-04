import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearSellerError, resetPasswordSeller } from "../../Actions/sellerActions";

export default function ResetPasswordSeller(){
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const {isAuthenticatedSeller , error} = useSelector(state => state.sellerState);
    const navigate = useNavigate();
    const { token }=useParams();

    const submitHandler = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('password',password);
            formData.append('confirmPassword',confirmPassword);
            dispatch(resetPasswordSeller(formData,token))
    }

    useEffect(()=>{
        if(isAuthenticatedSeller) {
            toast('Password Reset Success',{
                type: 'success',
                position : 'bottom-center'
            })
            navigate('/home')
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
    },[isAuthenticatedSeller,error,dispatch   ])


    return(
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
          <div className="flex flex-col md:flex-row">
            {/* Right Side: New Password Form */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center overflow-y-auto">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-4 text-center">New Password</h1>
              <p className="text-center text-brown-600 mb-8">Set a new password for your account</p>

              <form onSubmit={submitHandler} className="space-y-6">
                {/* Password Field */}
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <label htmlFor="confirm_password_field" className="block text-sm font-medium text-brown-700 mb-1 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password_field"
                    className="block w-full px-4 py-3 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>

                {/* Set Password Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center mt-6"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Set Password
                </button>
              </form>
            </div>
            
            {/* Left Side: Background Image */}
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