// import axios from "axios"
// import { REQUEST_CHECK_FAIL, REQUEST_CHECK_REQUEST, REQUEST_CHECK_SUCCESS } from "../constants/requestConstants";

// export const requestCheck=({info})=> async(dispatch,getState)=>{
//     dispatch({
//         type: REQUEST_CHECK_REQUEST
//     })
//     const {userSign:{userInfo}}=getState();
//     try {
//         const {data} = await axios.post(`/api/request/check`,{
//             headers:{authorization:`Bearer ${userInfo.token}`}
//         },info);
//         dispatch({
//             type:REQUEST_CHECK_SUCCESS,
//             payload:data
//         })
//     } catch (error) {
//         dispatch({
//             type:REQUEST_CHECK_FAIL,
//             payload:error.response && error.response.data.message? error.response.data.message:error.message
//         })
//     }
// }
