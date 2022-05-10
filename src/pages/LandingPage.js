import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function LandingPage(props) {
    const userSign = useSelector(state => state.userSign)
        if(userSign.userInfo)
            props.history.push('/home')
    return (
        <div style={{height:"85vh",background: "url('./images/covid-college.jpg')",backgroundRepeat:' no-repeat',backgroundSize:"100% 100%"}}>
        <div style={{backdropFilter:"blur(9px)",height:"100%",textAlign:"center"}}>
        <h1 className="pt-4" style={{fontFamily:'Dancing Script',color:"orange"}}>A System For Student Administraion And Conduct</h1>
        <div style={{paddingTop:"7rem", color: "black",fontFamily:"'Mate SC', serif",textShadow:"0 0 6px #FFA500"}} className="text-center">

            
            <h1 className="mb-3" style={{fontWeight: "700", fontSize: "65px"}}>"A One Stop Portal For Hostlers"</h1>
            <h1 className="mb-3" >#TheNewNormal</h1>     
            
        </div>   
        <div style={{color: "black",fontFamily:"'Mate SC', serif",textShadow:"0 0 6px silver"}} className="text-center">
            <br /><br /> 
            <h1 className="mb-3 " style={{fontWeight: "600", fontSize: "50px",color:""}} >Don't worry about the forgettable virus anymore</h1>  
            <h1 className="mb-3 " style={{fontWeight: "600", fontSize: "50px",color:""}}>Hostify is at your aid</h1>     
            
        </div>   
        </div>
    </div>
    )
}

export default LandingPage
