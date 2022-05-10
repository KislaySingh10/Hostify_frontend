import { Modal } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Order() {
    const status="def"
    const userDetail = useSelector(state => state.userDetail)
    const userSign = useSelector(state=> state.userSign)
    const dispatch = useDispatch()
    const [item, setItem] = useState("")
    const [from, setFrom] = useState("")
    const [hostel, setHostel] = useState("")
    const [mob, setMob] = useState("")
    
    const [order, setOrder] = useState(userDetail.userDetails.orders)
    const [open, setOpen] = useState(false)
    console.log(userDetail,userSign)
    const submitHandler=async(event)=>{
        event.preventDefault()
        const {data} = await axios.post("/api/request/order",
            {from:from,hostel:hostel,mobileno:mob,item:item},{
                headers:{authorization:`Bearer ${userSign.userInfo.token}`}
            })
        console.log(data)
        setOrder(prev=>
            [...prev,data])
        setOpen(false)
        // userDetails.
    }
    const approveHandler=async(id)=>{
      await axios.put(`/api/info/order/${id}/approve`)
    }
    const declineHandler=async(id)=>{
      await axios.put(`/api/info/order/${id}/reject`)
    }
    let body=(<div style={{top: `50%`,left: `50%`,transform: `translate(-50%, -50%)` }} className="roomMod">
                <h1>Order</h1>
                <form class="row g-3" onSubmit={submitHandler}>
                <div class="col-md-6">
                    <label for="name" class="form-label">Name</label>
                    <input disabled value={userSign.userInfo.name} type="text" class="form-control" id="name" />
                </div>
                <div class="col-md-6">
                    <label for="hostel" class="form-label">Hostel</label>
                    <select name="hostel" class="form-select" required  onChange={e=>{setHostel(e.target.value)}}>
                        <option value="BH-1">BH-1</option>
                        <option value="BH-2">BH-2</option>
                        <option value="BH-3">BH-3</option>
                        <option value="GH-1">GH-1</option>
            
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="mobile" class="form-label">Mobile no.</label>
                    <input name="mobileno" type="number" class="form-control" id="mobile" required  onChange={e=>{setMob(e.target.value)}}/>
                </div>
                <div class="col-md-6">
                    <label for="mobile" class="form-label">Order from</label>
                    <select name="from" class="form-select"  required  onChange={e=>{setFrom(e.target.value)}}>
                        <option selected value="Canteen">Canteen</option>
                        <option value="Book Shop">Book Shop</option>
                        <option value="Juice center">Juice corner</option>
                        <option value="sanchi">Sanchi</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label for="item" class="form-label">Item Description</label>
                    <textarea name="item" class="form-control" id="item" rows="3" required  onChange={e=>{setItem(e.target.value)}}></textarea>
                </div>     
                <div class="col-12">
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
            <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Order History</h1>
            <button className="btn btn-primary m-3" onClick={()=>{setOpen(true)}}>+ Add Order</button>

          </div>
          {   userDetail.userDetails && order.length>0 ?order.map((order,index)=>{
                return  <div class="card border-0 rounded-0 shadow-sm p-3 mb-3">
                            <div class="row d-flex align-items-center">
                                <div class="col-md-10">
                                <p><b>Hostel</b> -  {order.hostel}</p>
                                <p><b>Mobile No</b> -  {order.mobileno}</p>
                                <p><b>From</b> -  {order.from}</p>
                                <p><b>Items</b> -  {order.item}</p>
                                </div>
                                <div class="col-md-2">
                                {order.status==="pending"?
                                    <h5 class="text-warning"><i class="fa fa-exclamation-circle"></i> Pending</h5>:
                                    order.status==="approved"?
                                    <h5 class="text-success"><i class="fa fa-check-circle"></i> Delivered</h5>:
                                    <h5 class="text-danger"><i class="fa fa-times-circle"></i> Not Available</h5>}
                                </div>
                            </div>
                        </div>
                }):(<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>You dont have any previous orders.</p>)
            }
            </div>
            </div>
            ):(
            <div>
            <div className="text-center">
            <h1 class="mb-2 "  style={{fontFamily:'Dancing Script',fontSize:"4rem",fontWeight:"bold"}}>Order History</h1>

          </div>
          {   userDetail.userDetails && order.length>0 ?order.map((order,index)=>{
                return  <div class="card border-0 rounded-0 shadow-sm p-3">
                        <div class="row d-flex align-items-center">
                            <div class="col-md-10">
                                <p><b>Name</b> -   {userDetail.userDetails.user.find(user=>user._id==order.user).name}</p>
                                <p><b>Hostel No</b> -  {order.hostel}</p>
                                <p><b>Mobile No</b> -  {order.mobileno}</p>
                                <p><b>From</b> -  {order.from}</p>
                                <p><b>Items</b> -  {order.item}</p>
                                </div>
                                <div class="col-md-2 text-center">
                                    <button type="submit" className="btn btn-success w-75 m-1" onClick={()=>approveHandler(order._id)}>Delivered</button>
                                    <button type="submit" className="btn btn-danger w-75 m-1" onClick={()=>declineHandler(order._id)}>Not Available</button>
                                </div>
                        </div>
                        </div>
                    }):(<p className="text-center " style={{fontSize:"2rem",marginTop:"8rem"}}>No one ordered anything.</p>)
                }
        </div>
        
        )}
        </div>
    )
}

export default Order
