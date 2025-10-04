import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({children}) {


    const {isAuthenticatedSeller} = useSelector(state => state.sellerState)

    if(!isAuthenticatedSeller){
        return <Navigate to="/loginseller" />
    }

    return children;
}