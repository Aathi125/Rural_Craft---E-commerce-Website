import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiate2FA } from "../../Actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Send2FA() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, message, error } = useSelector((state) => state.authState);

    const handleSend2FA = () => {
        dispatch(initiate2FA());
    };

    useEffect(() => {
        if (message) {
            toast.success(message,{
              position : 'bottom-center'});
            navigate("/verify2fa"); // Redirect to verification page
        }
        if (error) {
            toast(error,{
              position : 'bottom-center',
              type : 'error',
              // onOpen : ()=>{ dispatch (clearSellerError)}
          });
        }
    }, [message, error, navigate]);

    return (
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
        
              {/* Right Side: 2FA Request Section */}
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center overflow-y-auto">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-4 text-center">Two-Factor Authentication</h1>
                <p className="text-center text-brown-600 mb-8">
                  Your email: <span className="font-semibold text-brown-700">{user?.email}</span>
                </p>
          
                <button
                  onClick={handleSend2FA}
                  className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Send 2FA Code
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}
