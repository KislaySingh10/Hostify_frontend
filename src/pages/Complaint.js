import { Modal } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Complaint() {
    const status="def"
    const userDetail = useSelector(state => state.userDetail)
    const userSign = useSelector(state=> state.userSign)
    const dispatch = useDispatch()
    const [item, setItem] = useState("")
    const [from, setFrom] = useState("")
    const [hostel, setHostel] = useState("")
    const [mob, setMob] = useState("")
    
    const [open, setOpen] = useState(false)
    console.log(userDetail,userSign)
    const submitHandler=async(event)=>{
        event.preventDefault()
        const {data} = await axios.post("/api/request/order",
            {from:from,hostel:hostel,mobileno:mob,item:item},{
                headers:{authorization:`Bearer ${userSign.userInfo.token}`}
            })
        console.log(data)
        setOpen(false)
        // userDetails.
    }
    const approveHandler=async(id)=>{
        await axios.put(`/api/info/complaint/${id}/approve`)
        window.open('mailto:singhkislay1012@gmail.com')
    }
    const declineHandler=async(id)=>{
      await axios.put(`/api/info/order/${id}/reject`)
    }

    return (
        <div>
            <div className="text-center">
            <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Student Complaints</h1>

          </div>
          {   userDetail.userDetails && userDetail.userDetails.complaints.length>0 ?userDetail.userDetails.complaints.map((com,index)=>{
                return  <div class="card border-2 shadow-sm px-5 py-3 m-3" style={{borderRadius:"2rem"}}>
                        <div class="row d-flex align-items-center">
                            <div class="col-md-10">
                                <p><b>Name</b> -   {userDetail.userDetails.user.find(user=>user._id==com.user).name}</p>
                                <p><b>Hostel No</b> -  {com.hostel}</p>
                                <p><b>Room No</b> -  {com.room}</p>
                                <p><b>Mobile No</b> -  {com.mobileno}</p>
                                <p><b>Complaint</b> -  {com.feedback}</p>
                                </div>
                                <div class="col-md-2 text-center">
                                {com.status=="approved"?
                                    <button disabled className="btn btn-danger w-50 m-1" onClick={()=>declineHandler(com._id)}>Underway</button>:
                                    <button type="submit" className="btn btn-success w-50 m-1" onClick={()=>approveHandler(com._id)}>Take Care</button>}
                                </div>
                        </div>
                        </div>
                    }):(<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>Students are happy and no one is complaining.</p>)
                }
        </div>
    )
}

export default Complaint
