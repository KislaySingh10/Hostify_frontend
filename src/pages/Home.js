import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Checkup from './Checkup'
import Arrival from './Arrival'
import Leave from './Leave'
import Order from './Order'
import Hostel from './Hostel'
import Vaccine from './Vaccine'
import { Divider, Tabs,Box, Typography, Tab } from '@material-ui/core'
import { userSignIn } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { detailUser } from '../actions/infoActions'
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
function Home(props) {
    const dispatch = useDispatch();
    const userSign = useSelector(state => state.userSign);
    if(!userSign.userInfo)
    props.history.push("/")
    const [value,setValue] = useState(0)
    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(detailUser(userSign.userInfo._id))
    }, [])
        
    return (
        <div class="row g-0"  style={{height:"100%",padding:"2rem 0rem"}}>
            <Dashboard></Dashboard>
                {/* <div style={{borderRight:"1px solid lightgray",height:"100%"}}>
                    <Tabs orientation="vertical" value={value} onChange={handleChange} style={{width:"100%"}}  className="tab">
                        <Tab label="Dashboard" {...a11yProps(0)}></Tab>
                        <Tab label="Checkup" {...a11yProps(1)}></Tab>
                        <Tab label="Arrival" {...a11yProps(2)}></Tab>
                        <Tab label="Leave" {...a11yProps(3)}></Tab>
                        <Tab label="Order" {...a11yProps(4)}></Tab>
                        <Tab label="Hostel" {...a11yProps(5)}></Tab>
                        <Tab label="Vaccine" {...a11yProps(6)}></Tab>
                    </Tabs>
                </div> */}
            {/* <div class="list-group" id="list-tab" role="tablist">
                <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
                <a class="list-group-item list-group-item-action" id="list-reqcheckup-list" data-bs-toggle="list" href="#list-reqcheckup" role="tab" aria-controls="Checkup">Check-up</a>
                <a class="list-group-item list-group-item-action" id="list-reqarrival-list" data-bs-toggle="list" href="#list-reqarrival" role="tab" aria-controls="Arrival">Arrival</a>
                <a class="list-group-item list-group-item-action" id="list-leave-list" data-bs-toggle="list" href="#list-leave" role="tab" aria-controls="leave">Leave</a>
                <a class="list-group-item list-group-item-action" id="list-order-list" data-bs-toggle="list" href="#list-order" role="tab" aria-controls="order">Order</a>
                {}
                <a class="list-group-item list-group-item-action" id="list-hostel-list" data-bs-toggle="list" href="#list-hostel" role="tab" aria-controls="hostel">Hostel</a>
                <a class="list-group-item list-group-item-action" id="list-vaccine-list" data-bs-toggle="list" href="#list-vaccine" role="tab" aria-controls="vaccine">Vaccination</a>
            </div> */}
            {/* <TabPanel value={value} index={0}>
                <Dashboard></Dashboard>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Checkup></Checkup>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Arrival></Arrival>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Leave></Leave>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Order></Order>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Hostel></Hostel>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <Vaccine></Vaccine>
            </TabPanel> */}
            {/* <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                    <DashBoard></DashBoard>
                </div>
                <div class="tab-pane fade" id="list-reqcheckup" role="tabpanel" aria-labelledby="list-reqcheckup-list">
                    <Checkup></Checkup>
                </div>
                <div class="tab-pane fade" id="list-reqarrival" role="tabpanel" aria-labelledby="list-reqarrival-list">
                    <Arrival></Arrival>
                </div>
                <div class="tab-pane fade" id="list-leave" role="tabpanel" aria-labelledby="list-leave-list">
                    <Leave></Leave>
                </div>
                <div class="tab-pane fade" id="list-order" role="tabpanel" aria-labelledby="list-order-list">
                    <Order></Order>
                </div>
                {}
                <div class="tab-pane fade" id="list-hostel" role="tabpanel" aria-labelledby="list-hostel-list">
                    <Hostel></Hostel>
                </div>
                <div class="tab-pane fade" id="list-vaccine" role="tabpanel" aria-labelledby="list-vaccine-list">
                    <Vaccine></Vaccine>
                </div>
            </div> */}
        </div>

    )
}

export default Home
