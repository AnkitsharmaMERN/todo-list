//This is for only register users 
import { Get_login_Request, Get_login_Success, Get_login_fail } from "./constant";
import { Get_signup_request, Get_signup_success, Get_signup_fail } from "./constant";
import { load_user_Request, load_user_Success, load_user_Fail } from "./constant"



//this is for only users 
export const registration = (state = {}, action) => {
    switch (action.type) {
        case Get_signup_request:
            return {
                loading: true,

            }
        case Get_signup_success:
            return {
                loading: false,
                user: action.paylod
            }
        case Get_signup_fail:
            return {
                loading: false,
                error: action.paylod
            }
        default:
            return state;
    }
}


export const loginReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case Get_login_Request:
            return {
                loading: true,
                ...state
            }
        case Get_login_Success:
            return {
                loading: false,
                user: action.payload
            }

        case Get_login_fail:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}



export const getuserdetails = (state = { user: {} }, action) => {
    switch (action.type) {
        case load_user_Request:
            return {
                loading: true,
                ...state
            }
        case load_user_Success:
            return {
                loading: false,
                user: action.payload
            }
        case load_user_Fail:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

}
