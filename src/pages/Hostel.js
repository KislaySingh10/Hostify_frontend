import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Hostel() {
   const [name, setName] = useState("")
    const userDetail = useSelector(state => state.userDetail)
    const userSign = useSelector(state=> state.userSign)
    const submitHandler=async(event)=>{
        event.preventDefault()
        await axios.post("/api/info/addhostel",{name});
        setName("")
    }
    const progHandler=async(id)=>{
        await axios.put(`/api/info/hostel/${id}/prog`)
    }
    const acceptHandler=async(id)=>{
        await axios.put(`/api/info/hostel/${id}/approve`)
    }
    return (
        <div>
            
            <div class="card text-center container form border-0 rounded-0 shadow-sm px-3 py-3">
                <h1 class="mb-2" style={{fontWeight: "700"}}>Add Hostel</h1>
                <form class="row" onSubmit={submitHandler}>
                    <div class="col-md-4 offset-md-3">
                        <input class="form-control mt-3" type="text" name="name" placeholder="Name" onChange={e=>{setName(e.target.value)}} />
                    </div>
                    <div class="col-md-2">
                    <div class="d-grid gap-2 pt-3">
                        <button type="submit" class="btn btn-success">Add</button>
                    </div>
                </div>
                </form>
            </div>

            <hr />

            <h1 class="mb-2 mx-3"  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Hostels</h1>
            <div className="d-flex">
                {userDetail.userDetails.hostel?userDetail.userDetails.hostel.map(hos=>
                        <div class="card border-3 shadow-sm p-3 m-3 w-25" style={{borderRadius:"2rem"}}>
                            <div class="row text-center g-3">
                                <div>
                                    <h2><b>Hostel Name</b> -  {hos.name} </h2>
                                </div>
                                <div >
                                {
                                    hos.status==="pending"?(
                                    <h5 class="text-warning"><i class="fa fa-exclamation-circle"></i>Being Sanitized</h5>):
                                    hos.status==="acc"?( <h5 class="text-success"><i class="fa fa-check-circle"></i> Sanitized</h5>)
                                    :(<h5 class="text-danger"><i class="fa fa-times-circle"></i> Not Sanitization </h5>)
                                }
                                </div>
                                <div >
                                {hos.status == "pending" ?
                                        <button type="submit" class="btn btn-success mb-2" onClick={()=>acceptHandler(hos._id)}>Sanitization Done</button>:
                                        <button type="submit" class="btn btn-warning" onClick={()=>progHandler(hos._id)}>Sanitization Needed</button>
                                
                                }
                                    
                                </div>
                            </div>
                        </div>
                        ):<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>No information about Hostels.</p>}
            </div>


        </div>
    )
}

export default Hostel
