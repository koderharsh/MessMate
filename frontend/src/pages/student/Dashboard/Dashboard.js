import React,{useEffect} from "react";
import moment from "moment";
import {useHistory} from 'react-router-dom';
import StudentAbsence from "../../Components/student/StudentAbsence";
import StudentMenu from "../../Components/student/StudentMenu";
import StudentFeedback from "../../Components/student/StudentFeedback";
import "./dashboard.css";
import {isAuthenticated} from "../../../util/studentApi";
import firebase from "../../../firebase";
import {vapidKey} from "../../../vapidKey";
import {postFCM} from "../../../util/notifApi";

const Dashboard=()=>{
  const history=useHistory();
const hostelId=isAuthenticated()&&isAuthenticated().hostelId;
const idtoken=isAuthenticated()&&isAuthenticated().studenttoken;

useEffect(()=>{
  const msg=firebase.messaging();
  msg.requestPermission().then(()=>{
    return msg.getToken({ vapidKey});
  }).then((data)=>{
    //console.log(data)
    if(localStorage.getItem("fcm")){
      if(JSON.parse(localStorage.getItem("fcm"))===data)
      console.log("Already in db")
      else {
        localStorage.removeItem("fcm");
        localStorage.setItem("fcm",JSON.stringify(data))
        postFCM(idtoken,{token:data})
      }
    }else{
        localStorage.setItem("fcm",JSON.stringify(data))
        postFCM(idtoken,{token:data})
    }
  })
},[])
firebase.messaging().onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

  return (
    <div id='dashboard-wrapper'>
      <div id='navbar-wrapper'>
        <span id='navleft'>
          <i className='lni lni-dinner'></i> MESSMATE
        </span>
        <span id='navright'>
          {moment().format('hh:mm A')} | {hostelId} <i className='lni lni-power-switch' onClick={()=>
          {localStorage.removeItem("jwt");
            history.push("/login/student")
          }}></i>
        </span>
      </div>

      <div id='cardgrid'>
        <div className='cardgrid__card' id='card1'>
          <StudentAbsence />
        </div>
        <div className='cardgrid__card' id='card2'>
          <StudentFeedback />
        </div>
        <div className='cardgrid__card' id='card3'>
          <StudentMenu />
        </div>
      </div>

      <div id='messImg-wrapper'>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
