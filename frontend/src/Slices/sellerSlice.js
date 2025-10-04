import { createSlice } from "@reduxjs/toolkit";


const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        loading: false,
        isAuthenticatedSeller : false,
     
    },
    reducers: {
        loginRequestSeller(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccessSeller(state, action){
            return {
            
                loading: false,
                isAuthenticatedSeller : true,
                seller: action.payload.seller
            }
        },
        loginFailSeller(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
    clearSellError(state, action){
            return {
                ...state,
                error:  null
        }
    

    },
    
         initiate2FARequestSeller(state) {
            return {
                ...state,
                loading: true
            };
        },
        initiate2FASuccessSeller(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        },
        initiate2FAFailSeller(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        },
        verify2FARequestSeller(state) {
            return {
                ...state,
                loading: true
            };
        },
        verify2FASuccessSeller(state, action) {
            return {
                ...state,
                loading: false,
                is2FAVerified: true,
                seller: action.payload.seller,
    
                 
            };
        },
        verify2FAFailSeller(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        },
        
    
    registerRequestSeller(state, action){
        return {
            ...state,
            loading: true,
        }
    },
    registerSuccessSeller(state, action){
        return {
        
            loading: false,
            isAuthenticatedSeller : true,
            seller: action.payload.seller
        }
    },
    registerFailSeller(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    loadSellerRequest(state, action){
        return {
            ...state,
            isAuthenticatedSeller : false,
            loading: true,
        }
    },
    loadSellerSuccess(state, action){
        return {
        
            loading: false,
            isAuthenticatedSeller : true,
            seller: action.payload.seller
        }
    },
    loadSellerFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    logoutSellerSuccess(state, action){
        return {
        
            loading: false,
            isAuthenticatedSeller : false,
            seller:null
            
        }
    },
    logoutSellerfail(state, action){
        return {
            ...state,
            error:  action.payload
        }
    },
    updateProfileSellerRequest(state, action){
        return {
            ...state,
            loading: true,
            isUpdatedSeller : false
        }
    },
    updateProfileSellerSuccess(state, action){
        return {
            ...state,
            loading: false,
            seller: action.payload.seller,
            isUpdatedSeller : true
        }
    },
    updateProfileSellerFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    updatePasswordSellerRequest(state, action){
        return {
            ...state,
            loading: true,
            isUpdatedSeller : false
        }
    },
    updatePasswordSellerSuccess(state, action){
        return {
            ...state,
            loading: false,
            isUpdatedSeller : true
        }
    },
    updatePasswordSellerFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },

    forgotPasswordSellerRequest(state, action){
        return {
            ...state,
            loading: true,
            message : null
           
        }
    },
    forgotPasswordSellerSuccess(state, action){
        return {
            ...state,
            loading: false,
            message : action.payload.message
        }
    },
    forgotPasswordSellerFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },

    resetPasswordSellerRequest(state, action){
        return {
            ...state,
            loading: true
           
        }
    },
    resetPasswordSellerSuccess(state, action){
        return {
            ...state,
            loading: false,
            isAuthenticatedSeller : true,
            seller:action.payload.seller
        }
    },
    resetPasswordSellerFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    deleteAccountSellerRequest(state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    deleteAccountSellerSuccess(state, action) {
        return {
            ...state,
            loading: false,
            isAuthenticatedSeller: false, // User is no longer authenticated
            seller: null, // Clear user data
        };
    },
    deleteAccountSellerFail(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
   
    },

    
   
}
});

const { actions, reducer } = sellerSlice;

export const { loginRequestSeller
    ,loginSuccessSeller
    ,loginFailSeller
    ,clearSellError,
    registerRequestSeller,
    registerSuccessSeller,
    registerFailSeller,
    loadSellerRequest,
    loadSellerSuccess,
    loadSellerFail,
    logoutSellerSuccess,
    logoutSellerfail,
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
} = actions;

export default reducer;

