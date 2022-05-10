import { Modal } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Help() {
    const [name, setName] = useState("")
    const userDetail = useSelector(state => state.userDetail)
    const userSign = useSelector(state=> state.userSign)
    const [mes, setMes] = useState("Please Help")
    const [req, setReq] = useState("")
    const [urg, setUrg] = useState("Emergency")
    const [mob, setMob] = useState("")
    const [hos, setHos] = useState()
    const [room,setRoom]=useState()
    const [open, setOpen] = useState(false)
    const [helpList, setHelp] = useState(userDetail.userDetails.help)
    const submitHandler=async(event)=>{
        event.preventDefault()
        const {data}=await axios.post("/api/request/seekhelp",{message:mes,requirement:req,hostel:hos,mobile:mob,room:room,urgent:urg},{
            headers:{authorization:`Bearer ${userSign.userInfo.token}`}
        });
        setHelp(prev=>
            [...prev,data])
        setOpen(false)
    }
    let body=(<div style={{top: `50%`,left: `50%`,transform: `translate(-50%, -50%)` }} className="roomMod">
    <h1>Need Help</h1>
    <form class="row g-3" onSubmit={submitHandler}>
    <div class="col-md-6">
        <label for="urgent" class="form-label">Urgency</label>
        <select name="urgent" class="form-select" required  onChange={e=>{setUrg(e.target.value)}}>
            <option value="Emergency">Emergency</option>
            <option value="High">Urgent</option>
            <option value="Moderate">Moderate </option>

        </select>
    </div>
    <div class="col-md-6">
        <label for="mobile" class="form-label">Mobile no.</label>
        <input name="mobileno" type="number" class="form-control" id="mobile" required  onChange={e=>{setMob(e.target.value)}}/>
    </div>
    <div class="col-md-6">
        <label for="hostel" class="form-label">Hostel</label>
        <input name="hostel" type="String" class="form-control" id="hostel" required  onChange={e=>{setHos(e.target.value)}}/>
    </div>
    <div class="col-md-6">
        <label for="room" class="form-label">Room Number</label>
        <input name="room" type="number" class="form-control" id="room" required  onChange={e=>{setRoom(e.target.value)}}/>
    </div>
    <div class="col-md-12">
        <label for="req" class="form-label">Requirement</label>
        <input name="req" type="text" class="form-control" id="req" required  onChange={e=>{setReq(e.target.value)}}/>
    </div>
    <div class="col-md-12">
        <label for="item" class="form-label">Request Message</label>
        <textarea name="item" class="form-control" id="item" rows="3" onChange={e=>{setMes(e.target.value)}}></textarea>
    </div>     
    <div class="col-12 text-center">
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
        <div className="text-center">
            <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Help Corner</h1>
            <button className="btn btn-primary m-3 px-4" onClick={()=>{setOpen(true)}}> SEEK HELP</button>
          </div>
            <div className="d-flex">
                {userDetail.userDetails.help  && helpList.length>0?helpList.map(item=>
                        <div class="card border-3 shadow-sm p-3 m-3 w-25" style={{borderRadius:"2rem",borderColor:item.urgent=="Emergency"?"red":item.urgent=="High"?"orange":"gold"}}>
                        <div class="row d-flex">
                                <div class="col-md-12">
                                <div className="text-center">
                                <h3 style={{color:item.urgent=="Emergency"?"red":item.urgent=="High"?"orange":"gold"}}><b>Urgency-{item.urgent}</b> </h3>
                                </div>
                                <p><b>Name</b> -  {item.username}</p>
                                <p><b>Hostel</b> -  {item.hostel}</p>
                                <p><b>Room</b> -  {item.room}</p>
                                <p><b>Mobile No</b> -  {item.mobile}</p>
                                <p><b>Requirements</b> -  {item.requirement}</p>
                                <p><b>Message</b> -  {item.message}</p>
                                </div>
                            </div>
                        </div>
                        ):(<p className="text-center" style={{fontSize:"2rem",marginTop:"8rem"}}>Everyone is well and good.</p>)}
                    </div>
        </div>
    )
}

export default Help
