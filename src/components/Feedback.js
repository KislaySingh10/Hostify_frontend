import { FormControlLabel, Modal, Switch } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Feedback() {
  
  const userDetail = useSelector(state => state.userDetail)
  const userSign = useSelector(state=> state.userSign)
  const [room, setRoom] = useState();
  const [desc, setDesc] = useState('');
  const [mob, setMob] = useState();
  const [hostel, setHostel] = useState('BH-1');
  const [open, setOpen] = useState(false)
  const submitHandler = async (event) => {
    event.preventDefault()
    const obj = {
      hostel: hostel,
      room: room,
      mobileno:mob,
      feedback: desc,
    };
    console.log(obj);
    const {data}=await axios.post('/api/request/create_feedback', obj,{
      headers:{authorization:`Bearer ${userSign.userInfo.token}`}});
      
    console.log(data)
    setOpen(false)
  };
  const modalStyle = {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
  const body = (
    <div style={modalStyle} className='feedBackPaper'>
      <h1 style={{ textAlign: 'center', fontWeight: '500' }}>Complaint Box</h1>
      <form class="row g-3" onSubmit={submitHandler}>
        <p style={{ marginTop: '2rem', fontSize: '1.3rem' }}>
          Feel free to let us know what you want
        </p>
        <div class="col-md-6">
                    <label for="hostel" class="form-label">Hostel</label>
                    <select name="hostel" class="form-select" required  onChange={e=>{setHostel(e.target.value)}}>
                        <option value="BH-1">BH-1</option>
                        <option value="BH-2">BH-2</option>
                        <option value="BH-3">BH-3</option>
                        <option value="GH-1">GH-1</option>
            
                    </select>
        </div>
        <div className="col-md-6">
        <label for="room" className="form-label">Room Number</label>
        <input name="room" className="form-control" type="text" id="room" required onChange={(e)=>{setRoom(e.target.value)}} />
        </div>
        <div class="col-md-6">
                      <label for="mobile" class="form-label">Mobile no.</label>
                      <input name="mobileno" type="number" class="form-control" id="mobile"   required  onChange={e=>{setMob(e.target.value)}} />
                    </div>
        <label for="desc" className="form-label"> 
          Description:
        </label>
        <textarea
          id='description'
          rows={4}
          value={desc}
          required
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          className="form-control"
        ></textarea>
        <div style={{ width: '100%', textAlign: 'center', margin: '1rem 0' }}>
          <button
            className='btn btn-primary optionBtn'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <div className='fb'>
      <button
        className='fb-button'
        onClick={() => {
          setOpen(true);
        }}
      >
        <i class='fas fa-comment-dots'></i> Complaint Box
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}

export default Feedback;
