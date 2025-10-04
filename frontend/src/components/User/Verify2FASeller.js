import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify2FASeller } from "../../Actions/sellerActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Verify2FASeller() {
    const [code, setCode] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { is2FAVerified, error } = useSelector((state) => state.sellerState);

    const handleVerify = (e) => {
        e.preventDefault();
        dispatch(verify2FASeller(code));
    };

    useEffect(() => {
        if (is2FAVerified) {
            toast.success("2FA Verification Successful!",{
              position : 'bottom-center'
          });
            navigate("/"); // Redirect to home after success
        }
        if (error) {
            toast(error,{
              position : 'bottom-center',
              type : 'error',
              // onOpen : ()=>{ dispatch (clearSellerError)}
          });
        }
    }, [is2FAVerified, error, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 w-full py-10 px-4">
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)]">
                <div className="flex flex-col md:flex-row">
                    {/* Right Side: Verification Code Form */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800">Enter Verification Code</h2>
                            <p className="text-brown-600 mt-2">Check your email for the 6-digit code</p>
                        </div>

                        <form onSubmit={handleVerify} className="space-y-6">
                            {/* Code Input Field */}
                            <div className="bg-amber-50/50 rounded-2xl p-6 mb-4 border border-amber-100">
                                <label htmlFor="code_field" className="text-lg font-semibold text-brown-800 flex items-center mb-2">
                                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Enter Code
                                </label>
                                <input
                                    type="text"
                                    id="code_field"
                                    className="mt-1 block w-full px-4 py-2 border-2 border-amber-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/50"
                                    placeholder="Enter 6-digit code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    maxLength="6"
                                />
                            </div>

                            {/* Verify Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-brown-600 text-white py-3.5 rounded-xl text-center block hover:shadow-lg hover:from-amber-700 hover:to-brown-700 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Verify Code
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
    );
}
