import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, userRegistration, userSignIn } from '../actions/userActions';

function Header(props) {

    const [openLog, setOpenLog] = useState(false)
    const [openSign,setOpenSign] = useState(false)
    const [name,setName]=useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [role, setRole] = useState("Student")
    const [college, setCollege] = useState("")
    const [email, setMail] = useState("")

    const dispatch = useDispatch()
    const userSign = useSelector(state => state.userSign)
    
    const logInReq=(event)=>{
        event.preventDefault();
        dispatch(userSignIn(email,password));
    }
    const signUpReq=(event)=>{
        event.preventDefault();
        console.log("ASDAOIJEF")
        if(confirm != password)
            alert("Confirm Password and password does not match");
        else
            dispatch(userRegistration(name,email,password,role,college));
    }

    const signOutHandler=()=>{
        dispatch(signOut())
    }
    const bodyLog = (
        <div style={{top:"50%",left:"50%",transform:"translate(-50%,-50%"}} className="paper">
          <div style={{width:"100%",textAlign:"center"}}>
          <h2 id="simple-modal-title">Login</h2>

          </div>
          <p id="simple-modal-description">
            <form className="signInForm" onSubmit={logInReq}>
                <label className="mt-4" htmlFor="username">Enter Email</label>
                <input className="form-control mt-1" type="mail" id="email" placeholder="Email" onChange={(e)=>{setMail(e.target.value)}} />
                <label className="mt-4" htmlFor="password">Enter Password</label>
                <input className="form-control my-1" type="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className="d-grid gap-2 pt-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
          </p>
        </div>
      )
      const bodySign = (
        <div style={{top:"50%",left:"50%",transform:"translate(-50%,-50%"}} className="paper">
        <div style={{width:"100%",textAlign:"center"}}>
          <h2 id="simple-modal-title">Sign Up</h2>
          </div>
          <form className="signUpForm" id="simple-modal-description" onSubmit={signUpReq}>
                <input class="form-control mt-5" type="text" name="name" placeholder="Username" onChange={(e)=>{setName(e.target.value)}}/>
                <input class="form-control mt-3" type="email" name="username" placeholder="Email" onChange={(e)=>{setMail(e.target.value)}}/>
                <input class="form-control my-3" type="password" name="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                <input class="form-control my-3" type="password" name="confirm" placeholder="Confirm Password" onChange={(e)=>{setConfirm(e.target.value)}} />
                <select class="form-select my-3" name="role" id="role" onChange={(e)=>{setRole(e.target.value)}}>
                    <option value="Student">Student</option>
                    <option value="staff">Admin</option>
                </select>
                <select class="form-select my-3" name="college" id="college" onChange={(e)=>{setCollege(e.target.value)}}>
                    <option value="IIITM Gwalior">IIITM Gwalior</option>
                </select>
                <div class="d-grid gap-2 pt-3">
                    <button type="submit" class="btn btn-success">Sign up</button>
                </div>
            </form>
        </div>
      )

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style={{backgroundColor:"#DAA520"}}>
                <div class="container-fluid mx-5">
                <a class="navbar-brand" style={{fontSize: "3.5rem" ,fontWeight: "700",fontFamily: 'Permanent Marker',letterSpacing:"7px"}} href="/">HOSTIFY</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {userSign.userInfo?(
                        <>
                        {userSign.userInfo.role=="staff" &&
                            <li className="nav-item">
                                <button class="btn mx-1 rounded-pill btn-primary shadow-sm" onClick={()=>{setOpenSign(true)}}>Register User</button>
                                <Modal
                                    open={openSign}
                                    onClose={()=>{setOpenSign(false)}}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    {bodySign}
                                </Modal>
                            </li>}
                        <li className="nav-item">
                            <a><button class="btn mx-1 btn-danger shadow-sm" onClick={signOutHandler}>Logout</button></a>
                        </li>
                        
                            </>):
                        <>
                            <li className="nav-item">
                                <a><button className="btn mx-1 rounded-pill btn-primary shadow-sm px-4" style={{fontSize:"1.5rem"}} onClick={()=>{setOpenLog(true)}}>Login</button></a>
                                <Modal
                                    open={openLog}
                                    onClose={()=>{setOpenLog(false)}}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    {bodyLog}
                                </Modal>
                            </li>
                        </>}
                    
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
