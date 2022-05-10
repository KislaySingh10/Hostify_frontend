import axios from "axios"
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"

export const userSignIn=(email,password)=>async(dispatch)=>{
    dispatch({ type:USER_SIGNIN_REQUEST})
    try {
        const {data} = await axios.post("/api/users/signin",{email,password})
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message:error.message
        })
    }
}

export const userRegistration=(name,email,password,role,college)=>async(dispatch)=>{
    dispatch({ type:USER_REGISTER_REQUEST})
    try {
        const {data} = await axios.post("/api/users/register",{name,email,password,role,college})
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message:error.message
        })
    }
}

export const signOut=() => (dispatch)=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    dispatch({type:USER_SIGNOUT})
}

// export const updateUserProfile=(user)=>async(dispatch,getState)=>{
//     dispatch({type:USER_UPDATE_REQUEST,payload:user})
//     const {userSignIn:{userInfo}}=getState();
//     console.log(userInfo)
//     try {
//         const {data} = await axios.put('/api/users/profile',user,{
//             headers:{authorization:`Bearer ${userInfo.token}`}
//         })
//         dispatch({type:USER_UPDATE_SUCCESS,payload:data})
//         dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
//         localStorage.setItem("userInfo",JSON.stringify(data))
//     } catch (error) {
//         dispatch({
//             type: USER_UPDATE_FAIL,
//             payload: error.response && error.response.data.message? error.response.data.message:error.message
//         })
//     }
// }