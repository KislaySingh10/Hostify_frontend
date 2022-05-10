import { Modal } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailUser } from '../actions/infoActions'

function Checkup(props) {
    const status="def"
    const userDetail = useSelector(state => state.userDetail)
    const userSign = useSelector(state=> state.userSign)
    const dispatch = useDispatch()
    const [time, setTime] = useState("")
    const [symptoms, setSymptoms] = useState("")
    const [age, setAge] = useState("")
    const [date, setDate] = useState("")
    const [check, setCheck] = useState(userDetail.userDetails.checkups)
    const [open, setOpen] = useState(false)
    console.log(userDetail,check)
    const submitHandler=async(event)=>{
        event.preventDefault()
        const {data} = await axios.post("/api/request/checkup",{time,date,symptoms,age},{headers:{authorization:`bearer ${userSign.userInfo.token}`}})
        console.log(data)
        setCheck(prev=>
            [...prev,data])
        setOpen(false)
        // userDetails.
    }
    const approveHandler=async(id)=>{
        await axios.put(`/api/info/checkup/${id}/approve`)
    }
    const declineHandler=async(id)=>{
        await axios.put(`/api/info/checkup/${id}/reject`)
    }
    let body=(<div style={{top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)` }} className="roomMod"><h1>Request Appointment</h1>
            <form class="row g-3 mt-1" onSubmit={submitHandler}>
                <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input disabled value={userSign.userInfo.name} type="email" class="form-control" id="name" />
                </div>
                <div class="col-md-6">
                <label for="age" class="form-label">Age</label>
                <input name="age" type="number" id="age" className="form-control" required onChange={e=>{setAge(e.target.value)}}/>
                </div>
                <div class="col-md-12">
                    <label for="symptoms" class="form-label">Symptoms</label>
                    <textarea name="symptoms" id="symptoms" rows="3" className="form-control" required onChange={e=>{setSymptoms(e.target.value)}}></textarea>
                </div>     
                <div class="col-md-6">
                <label for="date" class="form-label">Preferred Date</label>
                <input name="date" type="date" id="date" className="form-control" required onChange={e=>{setDate(e.target.value)}}/>
                </div>
                <div class="col-md-6">
                <label for="time" class="form-label">Preferred Time</label>
                <input name="time" type="text" id="time" className="form-control" required onChange={e=>{setTime(e.target.value)}} />
                </div> 
                <div class="col-12" style={{textAlign:"center"}}>
                <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
            
            </div>
    )
    return (
        <div className="p-3">
        
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
                    <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Recent Checkups</h1>
                    <button className="btn btn-primary m-3" onClick={()=>{setOpen(true)}}>+ REQUEST CHECKUP</button>

                </div>
                {   userDetail.userDetails && check.length>0 ?check.map((cp,index)=>{
                    return <div class="card border-2 shadow-sm px-5 py-3 m-3" style={{borderRadius:"2rem"}}>
                                <div class="row d-flex align-items-center">
                                        <div class="col-md-10">
                                        <p><b>Age</b> - {cp.age}</p>
                                        <p><b>Symptoms</b> - {cp.symptoms}</p>
                                        <p><b>Preferred Date</b> - {cp.date.substr(0,10)}</p>
                                        <p><b>preferred Time</b> - {cp.time}</p>
                                        </div>
                                        <div class="col-md-2">
                                        {cp.status==="pending"?(
                                            <h5 class="text-warning"><i class="fa fa-exclamation-circle"></i> Pending</h5>):
                                            cp.status==="acc"?( <h5 class="text-success"><i class="fa fa-check-circle"></i> Accepted</h5>)
                                            :(<h5 class="text-danger"><i class="fa fa-times-circle"></i> Rejected</h5>)
                                        }
                                    </div>
                                </div>
                            </div>
                }):(<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>You dont have any previous checkup records.</p>)
                }
            </div>
            </div>
            ):(
                <div>
                <div className="text-center">
                    <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Requested Checkups</h1>

                </div>
                {   userDetail.userDetails && check.length>0 ?check.map((cp,index)=>{
                    return <div class="card border-2 shadow-sm px-5 py-3 m-3" style={{borderRadius:"2rem"}}>
                            <div class="row d-flex align-items-center">
                            <div class="col-md-10">
                                <p><b>Name -</b>{userDetail.userDetails.user.find(user=>user._id==cp.user).name} </p>
                                <p><b>Age -</b> {cp.age} </p>
                                <p><b>Symptoms -</b>{cp.symptoms} </p>
                                <p><b>Date -</b> {cp.time} </p>
                                <p><b>Time -</b> {cp.date.substr(0,10)} </p>
                            </div>
                            <div class="col-md-2 text-center">
                                    <button type="submit" className="btn btn-success w-50 m-1" onClick={()=>approveHandler(cp._id)}>Approve</button>
                                    <button type="submit" className="btn btn-danger w-50 m-1" onClick={()=>declineHandler(cp._id)}>Reject</button>
                            </div>
                        </div>
                    </div>
                }):(<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>No pending checkup requests.</p>)
                }
                </div>
            )}
            
           
        </div>
    )
}

export default Checkup
