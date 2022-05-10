import axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/infoConstants";

export const detailUser=(userid)=> async(dispatch,getState)=>{
    dispatch({
        type: USER_DETAILS_REQUEST
    })
    const {userSign:{userInfo}}=getState();
    const url= userInfo.role=="staff"?`/api/info/get_all`:`/api/info/get_individual/${userid}`
    try {
        const {data} = await axios.get(url,{
            headers:{authorization:`Bearer ${userInfo.token}`}
        });
        console.log(data)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
        localStorage.setItem("userDetail",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message
        })
    }
}