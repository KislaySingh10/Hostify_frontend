import { Modal } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Arrival() {
    const role="student"
    const status="def"
    const userDetail = useSelector(state => state.userDetail)
    const userSign = useSelector(state=> state.userSign)
    const dispatch = useDispatch()
    const [branch, setBranch] = useState("")
    const [address, setAddress] = useState("")
    const [between, setBetween] = useState("")
    const [to, setTo] = useState("")
    const [hostel, setHostel] = useState("")
    const [mob, setMob] = useState("")
    const [cov, setCov] = useState("Positive")
    
    const [open, setOpen] = useState(false)
    
    const [arrive, setArr] = useState(userDetail.userDetails.arrivals)

    console.log(userDetail,userSign)
    const submitHandler=async(event)=>{
        event.preventDefault();
        const {data} = await axios.post("/api/request/arrival",
        {branch:branch,address:address,between:between,to:to,hostel:hostel,mobileno:mob,covid:cov},{
            headers:{authorization:`Bearer ${userSign.userInfo.token}`}
        })
        console.log(data)
        setArr(prev=>
            [...prev,data])
        setOpen(false)
        // userDetails.
    }
    const approveHandler=async(id)=>{
        await axios.put(`/api/info/arrival/${id}/approve`)
    }
    const declineHandler=async(id)=>{
        await axios.put(`/api/info/arrival/${id}/reject`)
    }
    let body=(<div style={{top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)` }} className="roomMod"><h1>Request Arrival</h1>
            <form class="row g-3" onSubmit={submitHandler}>
                <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input disabled value={userSign.userInfo.name} type="email" class="form-control" id="name" />
                </div>
                <div class="col-md-6">
                <label for="branch" class="form-label">Branch</label>
                <input name="branch" type="text" class="form-control" id="branch" required  onChange={e=>{setBranch(e.target.value)}}/>
                </div>
                <div class="col-12">
                <label for="Address" class="form-label">Address</label>
                <input name="address" type="text" class="form-control" id="Address" placeholder="Address"  required onChange={e=>{setAddress(e.target.value)}}/>
                </div>
                <div class="col-md-6">
                    <label for="inputZip" class="form-label">Between</label>
                    <input name="between" type="date" class="form-control" id="inputZip" required  onChange={e=>{setBetween(e.target.value)}}/>
                </div>
                <div class="col-md-6">
                    <label for="inputZip" class="form-label">To</label>
                    <input name="to" type="date" class="form-control" id="inputZip" required  onChange={e=>{setTo(e.target.value)}}/>
                </div>
                <div class="col-md-6">
                <label for="hostel" class="form-label">Hostel</label>
                <select name="hostel" class="form-select" required onChange={e=>{setHostel(e.target.value)}}>
                        <option value="BH-1">BH-1</option>
                        <option value="BH-2">BH-2</option>
                        <option value="BH-3">BH-3</option>
                        <option value="GH-1">GH-1</option>
                </select>
                </div>
                <div class="col-md-6">
                <label for="mobile" class="form-label">Mobile no.</label>
                <input name="mobileno" type="number" class="form-control" id="mobile" required onChange={e=>{setMob(e.target.value)}}/>
                </div>
                <div class="row col-md-12 mt-3">
                <div class="col-md-2">
                    <label for="covid" class="form-label">Covid Reports</label>
                </div>
                <div class="col-md-2">

                    <select name="covid" class="form-select" aria-label="Covid Reports" required onChange={e=>{setCov(e.target.value)}}>
                    <option selected value="positive">Positive</option>
                    <option value="negative">Negative</option>
                    </select>
                </div>
                </div>
                <div class="col-12" style={{textAlign:"center"}}>
                <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
            
            </div>
    )
    return (
        <div>
        <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-describedby='simple-modal-description'
      > 
        {body}
      </Modal>
        {(userSign.userInfo.role==="Student")?(
            <div>
            <div>
                <div className="text-center">
                    <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Recent Arrivals</h1>
                    <button className="btn btn-primary m-3" onClick={()=>{setOpen(true)}}>+ REQUEST ARRIVAL</button>

                </div>
                {   userDetail.userDetails && arrive.length>0 ?arrive.map((arr,index)=>{
                    return <div class="card border-2 shadow-sm px-5 py-3 m-3" style={{borderRadius:"2rem"}}>
                        <div class="row d-flex align-items-center">
                            <div class="col-md-10">
                            <p><b>Branch</b> -  {arr.branch} </p>
                            <p><b>Address</b> -  {arr.address} </p>
                            <p><b>Between</b> -   {new Date(arr.between).toDateString()}</p>
                            <p><b>To</b> -  {new Date(arr.to).toDateString()} </p>
                            <p><b>Hostel</b> -  {arr.hostel} </p>
                            <p><b>Mobile No</b> -  {arr.mobileno}</p>
                            <p><b>Covid Reports</b> -  {arr.covid} </p>
                            </div>
                            <div class="col-md-2">
                            {arr.status=="approved"?
                                <h5 class="text-success"><i class="fa fa-check-circle"></i> Accepted</h5>
                                :arr.status=="rejected"?
                                <h5 class="text-danger"><i class="fa fa-times-circle"></i> Rejected</h5>
                                :
                                <h5 class="text-warning"><i class="fa fa-exclamation-circle"></i> Pending</h5>}

                            </div>
                        </div>
                    </div>
                }):(<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>You dont have any previous arrival requests.</p>)
                }
            </div>
            </div>
        ):(
            <div>
            <div className="text-center">
                    <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Arrival Requests</h1>

                </div>
                {   userDetail.userDetails && arrive.length>0 ?arrive.map((arr,index)=>{
                    return <div class="card border-2 shadow-sm px-5 py-3 m-3" style={{borderRadius:"2rem"}}>
                            <div class="row d-flex align-items-center">
                            <div class="col-md-10">
                                <p><b>Name</b> -  {userDetail.userDetails.user.find(user=>user._id==arr.user).name}</p>
                                <p><b>Branch</b> -  {arr.branch}</p>
                                <p><b>Address</b> -  {arr.address}</p>
                                <p><b>Between</b> -   {arr.between.substr(0,10)}</p>
                                <p><b>To</b> -  {arr.to.substr(0,10)}</p>
                                <p><b>Hostel No</b> -  {arr.hostel}</p>
                                <p><b>Mobile No</b> -  {arr.mobileno}</p>
                                <p><b>Covid Reports</b> -  {arr.covid}</p>
                                </div>
                            <div class="col-md-2 text-center">
                                <button type="submit" className="btn btn-success w-50 m-1" onClick={()=>approveHandler(arr._id)}>Approve</button>
                                <button type="submit" className="btn btn-danger w-50 m-1" onClick={()=>declineHandler(arr._id)}>Reject</button>
                            </div>
                        </div>
                    </div>
                }):(<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>No upcoming arrivals requested.</p>)
                }
            </div>
        )}    
        </div>
    )
}

export default Arrival
