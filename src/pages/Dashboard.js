import { Modal } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailUser } from '../actions/infoActions'
import Feedback from '../components/Feedback';
import { dataAdmin, dataCom } from '../data';

function Dashboard(props){
    const dispatch = useDispatch();
    const userSign = useSelector(state => state.userSign);
    const userDetail = useSelector(state => state.userDetail)
    const [stud, setStud] = useState([])
    const [cov, setCov] = useState([])
    const [vac,setVac] = useState([])
    const [san, setSan] = useState([])
    const [open,setOpen]=useState(false)
    const [open2,setOpen2]=useState(false)
    if(!userSign.userInfo)
        props.history.push("/")
    useEffect(async() => {
        dispatch(detailUser(userSign.userInfo._id))
        setSan(userDetail.userDetails.hostel)
        const {data}=await axios.get("/api/info/get_users")
        setStud(data.users)
        setCov(data.users.filter(item=>item.covid==="positive"))
        setVac(data.users.filter(item=>item.vaccine=="yes"))
    }, [])

    const handleClick=(item)=>{
        props.history.push(`/${item}`)
    }
    const addHandler=()=>{

    }
    let body=(<div style={{top: `50%`,left: `50%`,transform: `translate(-50%, -50%)` }} className="roomMod">
                <div className="d-flex justify-content-between">
                <h2 style={{fontFamily:'Dancing Script',fontSize:"3rem",fontWeight:"bold",marginBottom:"1.5rem"}}>Covid Positive Students</h2>
                {userSign.userInfo.role=="staff"?<button className="btn btn-primary my-3 mb-4" onClick={()=>setOpen2(true)}>Add Student</button>:null}
                </div>
                {cov.map(item=>
                <div>{item.name}
                </div>)}
                <p style={{fontSize:"2rem"}}>
                    Dev
                </p>
                <hr />
                <p style={{fontSize:"2rem"}}>
                    Aman
                </p>
                
            </div>
    )
    let body2=(<div style={{top: `50%`,left: `50%`,transform: `translate(-50%, -50%)` }} className="roomMod">
                <div className="d-flex justify-content-between">
                <form onSubmit={addHandler}>

                </form>
                <button className="btn btn-primary" onClick={()=>setOpen2(true)}>Add</button>
                </div>
                {cov.map(item=>
                <div>{item.name}
                </div>)}
            </div>
    )
    console.log(san)
    return (
        <div className="row "  style={{height:"100%",padding:"2rem"}}>
        {userSign.userInfo.role!="staff"?<Feedback></Feedback>:null}
        <Modal
          open={open}
          onClose={()=>{setOpen(false)}}
          aria-describedby='simple-modal-description'
          > 
            {body}
          </Modal>
          <Modal
          open={open2}
          onClose={()=>{setOpen2(false)}}
          aria-describedby='simple-modal-description'
          > 
            {body2}
          </Modal>
        <div class="col-md-6">
            <div className="shadow d-flex justify-content-between flex-wrap" style={{border: "none",padding:"20px",marginBottom: "40px",color: "white",backgroundColor:"#32cd32"}}>
            <div>
                <h3 class="mb-2" style={{fontFamily:'Dancing Script',fontSize:"3rem",fontWeight:"bold"}}>General Statistics</h3>
                <h5>{vac.length} students vaccinated out of {stud.length} registered</h5>
                <h5>Hostels sanitized- {san && san.map(item=>{return item.status=="acc"?item.name:null})}</h5>
                <button className="btn btn-warning" onClick={()=>{setOpen(true)}}>List of covid positive students</button>
            </div>
                <img style={{width: "130px", height: "140px"}} src="./images/vaccine.jpg" />
            </div>
        </div>

        <div class="col-md-6">
            <div className="shadow d-flex justify-content-between flex-wrap" style={{border: "none",padding:" 20px",marginBottom: "40px",color: "white",backgroundColor:"#00bfff"}}>
                <div>
                <h3 class="mb-2" style={{fontFamily:'Dancing Script',fontSize:"3rem",fontWeight:"bold"}}>Help Corner</h3>
                <h5>Seeking any help??</h5>
                <h5>This is where you will find it.</h5>
                <button className="btn btn-warning" onClick={()=>props.history.push('/help')}>Visit Help Corner</button>
                </div>
                <img style={{width: "130px", height: "140px"}}  src="./images/help.jpg"/>
            </div>
        </div>

        {dataCom.map(item => 
        <div className="col-md-3 d-flex justify-content-around">
            <div className="card container form border-0 rounded-0 shadow-lg px-3 mb-3">
                <button className="btn " onClick={()=>{handleClick(item.tag)}}>
                    <img className="imgMed mt-2" src={item.img}></img>
                    <p className="mt-2 display-6" style={{fontFamily:'Dancing Script',fontWeight:"bold"}}><strong>{item.name}</strong></p>
                </button>

            </div>
        </div>
        )}

        {userSign.userInfo.role=="staff" && dataAdmin.map(item => 
        <div className="col-md-3 d-flex justify-content-around">
            <div className="card container form border-0 rounded-0 shadow-lg px-3 mb-3">
                <button className="btn " onClick={()=>{handleClick(item.tag)}}>
                    <img className="imgMed mt-2" src={item.img}></img>
                    <p className="mt-2 display-6" style={{fontFamily:'Dancing Script',fontWeight:"bold"}}><strong>{item.name}</strong></p>
                </button>

            </div>
        </div>
        )}
        

    </div>
    )
}

export default Dashboard
