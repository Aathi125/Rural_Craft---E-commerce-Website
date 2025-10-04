import { loginFail, 
    loginRequest, 
    loginSuccess, 
    clearUserError, 
    registerRequest, 
    registerSuccess, 
    registerFail,
    loadUserSuccess,
    loadUserRequest,
    loadUserFail, 
    logoutSuccess,
    logoutfail,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    deleteAccountFail,
    deleteAccountRequest,
    deleteAccountSuccess,
    registerUserInfoFail,
    registerUserInfoSuccess,
    registerUserInfoRequest,
    initiate2FAFail,
    initiate2FARequest,
    initiate2FASuccess,
    verify2FAFail,
    verify2FARequest,
    verify2FASuccess
} from "../Slices/authSlice"
import axios from 'axios'
import { logoutSellerSuccess } from "../Slices/sellerSlice"
import { toast } from "react-toastify"



//login user action
export const login = (email , password) => async (dispatch) => {

    try {
            dispatch(loginRequest())
           const { data } = await axios.post(`/api/v1/login`, {email , password})
           dispatch(logoutSellerSuccess());
           dispatch(loginSuccess(data));
        
    } catch (error) {
        
        dispatch(loginFail(error.response.data.message))
    }
} 

export const clearAuthError = ()=> (dispatch) => {
    dispatch(clearUserError())
}


//register user action
export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/register`, userData , config)
            // Dispatch action with new fields after successful registration
    dispatch(registerSuccess(data));
        
        
    } catch (error) {
        
        dispatch(registerFail(error.response.data.message))
    }
} 

export const registerUserInfo = (userData) => async (dispatch) => {

     try {
        dispatch(registerUserInfoRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/registerUserInfo`, userData , config)
        dispatch(registerUserInfoSuccess({
            ...data,
            shippingAddress: userData.shippingAddress,
            billingAddress: userData.billingAddress,
            wishlist: userData.wishlist,
            notificationPreferences: userData.notificationPreferences,
            feedbacks: userData.feedbacks,
            productsInterested: userData.productsInterested
          }));
        
    } catch (error) {
        
        dispatch(registerUserInfoFail(error.response.data.message))
    }
} 



//Load User Action (Get User Profile)

export const loaduser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest()); // Dispatch loading state

    const { data } = await axios.get("/api/v1/myprofile"); // Fetch user data
    dispatch(loadUserSuccess(data));// Dispatch success with user data // Dispatch success with user data
  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || "Failed to load user")); // Dispatch error
  }
};

//load user action (get user profile)
export const logout = async (dispatch) => {

    try {
        
        await axios.get(`/api/v1/logout`)
        dispatch(logoutSuccess())
        
        
    } catch (error) {
        
        dispatch(logoutfail(error.response.data.message))
    }
} 

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/update`, userData , config)
        dispatch(updateProfileSuccess(data))
        
    } catch (error) {
        
        dispatch(updateProfileFail(error.response.data.message))
    }
} 

export const updateUserInfo = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/update`, userData , config)
        dispatch(updateProfileSuccess(data))
        
    } catch (error) {
        
        dispatch(updateProfileFail(error.response.data.message))
    }
} 


// Initiate 2FA
export const initiate2FA = () => async (dispatch) => {
    try {
        dispatch(initiate2FARequest());

        const { data } = await axios.post("/api/v1/send2FA");

        dispatch(initiate2FASuccess(data.message));
    } catch (error) {
        dispatch(initiate2FAFail(error.response?.data?.message || "Failed to send 2FA code"));
    }
};

// Verify 2FA
export const verify2FA = (code) => async (dispatch) => {
    try {
        dispatch(verify2FARequest());

        const { data } = await axios.post("/api/v1/verfy2FA", { code });

        dispatch(verify2FASuccess(data));
    } catch (error) {
        dispatch(verify2FAFail(error.response?.data?.message || "Invalid 2FA Code"));
    }
};


export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
         await axios.put(`/api/v1/password/change`,formData,config)
        dispatch(updatePasswordSuccess())
        
    } catch (error) {
        
        dispatch(updatePasswordFail(error.response.data.message))
    }
} 


export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/forgot`,formData,config)
        dispatch(forgotPasswordSuccess(data))
        
    } catch (error) {
    
        
        dispatch(forgotPasswordFail(error.response.data.message))
    }
} 


export const resetPassword = (formData , token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/reset/${token}`,formData,config)
        dispatch(resetPasswordSuccess(data))
        
    } catch (error) {
        
        dispatch(resetPasswordFail(error.response.data.message))
    }
} 

export const deleteMyAccount = () => async (dispatch) => {
    try {
        dispatch(deleteAccountRequest());

        const { data } = await axios.delete('/api/v1/deleteMyAccount');
        dispatch(deleteAccountSuccess());

        // Logout the user after deletion
        dispatch(logoutSuccess());
  

        // Show success toast
        toast.success(data.message || 'Account deleted successfully',{
            position:'bottom-center'
        });
    } catch (error) {
        dispatch(deleteAccountFail(error.response?.data?.message || 'Failed to delete account'));
        
        // Show error toast
        toast.error(error.response?.data?.message || 'Failed to delete account',{
            position:'bottom-center'
        });
    }
};











