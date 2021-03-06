import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constants/userConstants";

export const userSignInReducer = (state={loading:false,userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null},action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_SIGNIN_FAIL:
            return {loading:false,error:action.payload}
        case USER_SIGNOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

// export const userUpdateReducer=(state={},action)=>{
//     switch(action.type){
//         case USER_UPDATE_SUCCESS:
//             return {loading:false,success:true}
//         case USER_UPDATE_REQUEST:
//             return {loading:true}
//         case USER_UPDATE_FAIL:
//             return {loading:false,error:action.payload}
//         case USER_UPDATE_RESET:
//             return {}
//         default: return state
//     }
// }