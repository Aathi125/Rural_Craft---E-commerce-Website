import { toast } from "react-toastify"
import { logoutSuccess } from "../Slices/authSlice"
import { loginFailSeller
    , loginRequestSeller, 
    loginSuccessSeller,
     clearSellError ,
     registerSuccessSeller,
     registerRequestSeller,
     registerFailSeller,
     loadSellerSuccess,
     loadSellerRequest,
     loadSellerFail,
     logoutSellerfail,
     logoutSellerSuccess,
     updateProfileSellerFail,
     updateProfileSellerRequest,
     updateProfileSellerSuccess,
     updatePasswordSellerFail,
     updatePasswordSellerRequest,
     updatePasswordSellerSuccess,
     forgotPasswordSellerFail,
     forgotPasswordSellerRequest,
     forgotPasswordSellerSuccess,
     resetPasswordSellerFail,
     resetPasswordSellerRequest,
     resetPasswordSellerSuccess,
     deleteAccountSellerFail,
     deleteAccountSellerRequest,
     deleteAccountSellerSuccess,
     initiate2FAFailSeller,
     initiate2FARequestSeller,
     initiate2FASuccessSeller,
     verify2FAFailSeller,
     verify2FARequestSeller,
     verify2FASuccessSeller
    } from "../Slices/sellerSlice"
import axios from 'axios'




export const loginSeller = (email , password) => async (dispatch) => {

    try {
            dispatch(loginRequestSeller())
           const { data } = await axios.post(`/api/v1/loginSeller`, {email , password})
           dispatch(logoutSuccess());
            dispatch(loginSuccessSeller(data));
            localStorage.setItem('sellerdata', JSON.stringify(data));
        
    } catch (error) {
        
        dispatch(loginFailSeller(error.response.data.message))
    }
} 

export const clearSellerError = dispatch => {
    dispatch(clearSellError())
}


export const registerSeller = (sellerData) => async (dispatch) => {

    try {
        dispatch(registerRequestSeller())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/registerSeller`, sellerData , config)
        dispatch(registerSuccessSeller(data))
        
    } catch (error) {
        
        dispatch(registerFailSeller(error.response.data.message))
    }
} 


export const initiate2FASeller = () => async (dispatch) => {
    try {
        dispatch(initiate2FARequestSeller());

        const { data } = await axios.post("/api/v1/send2FASeller");

        dispatch(initiate2FASuccessSeller(data.message));
    } catch (error) {
        dispatch(initiate2FAFailSeller(error.response?.data?.message || "Failed to send 2FA code"));
    }
};

// Verify 2FA
export const verify2FASeller = (code) => async (dispatch) => {
    try {
        dispatch(verify2FARequestSeller());

        const { data } = await axios.post("/api/v1/verfy2FASeller", { code });

        dispatch(verify2FASuccessSeller(data));
    } catch (error) {
        dispatch(verify2FAFailSeller(error.response?.data?.message || "Invalid 2FA Code"));
    }
};

export const loadSeller = ()=>async (dispatch) => {

    try {
        dispatch(loadSellerRequest())
        

        const { data } = await axios.get(`/api/v1/myprofileSeller`)
        dispatch(loadSellerSuccess(data))
        
    } catch (error) {
        
        dispatch(loadSellerFail(error.response.data.message))
    }
} 

//load user action (get user profile)
export const logoutSeller = async (dispatch) => {

    try {
        
        await axios.get(`/api/v1/logoutSeller`)
        dispatch(logoutSellerSuccess())
        
    } catch (error) {
        
        dispatch(logoutSellerfail)
    }
} 


export const updateProfileSeller = (sellerData) => async (dispatch) => {

    try {
        dispatch(updateProfileSellerRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/updateSeller`, sellerData , config)
        dispatch(updateProfileSellerSuccess(data))
        
    } catch (error) {
        
        dispatch(updateProfileSellerFail(error.response.data.message))
    }
} 


export const updatePasswordSeller = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordSellerRequest())
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
         await axios.put(`/api/v1/password/changeSeller`,formData,config)
        dispatch(updatePasswordSellerSuccess())
        
    } catch (error) {
        
        dispatch(updatePasswordSellerFail(error.response.data.message))
    }
} 


export const forgotPasswordSeller = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordSellerRequest())
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/forgotSeller`,formData,config)
        dispatch(forgotPasswordSellerSuccess(data))
        
    } catch (error) {
        
        dispatch(forgotPasswordSellerFail(error.response.data.message))
    }
} 


export const resetPasswordSeller = (formData , token) => async (dispatch) => {

    try {
        dispatch(resetPasswordSellerRequest())
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/resetSeller/${token}`,formData,config)
        dispatch(resetPasswordSellerSuccess(data))
        
    } catch (error) {
        
        dispatch(resetPasswordSellerFail(error.response.data.message))
    }
}

export const deleteMyAccountSeller = () => async (dispatch) => {
    try {
        dispatch(deleteAccountSellerRequest());

        const { data } = await axios.delete('/api/v1/deleteMyAccountSeller');
        dispatch(deleteAccountSellerSuccess());

        // Logout the SELLER after deletion
        dispatch(logoutSellerSuccess());

        // Show success toast
        toast.success(data.message || 'Account deleted successfully',{
            position:'bottom-center'
        });
    } catch (error) {
        dispatch(deleteAccountSellerFail(error.response?.data?.message || 'Failed to delete account'));
        
        // Show error toast
        toast.error(error.response?.data?.message || 'Failed to delete account',{
            position:'bottom-center'
        });
    }
};


