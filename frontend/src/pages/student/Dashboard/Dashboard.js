import React,{useEffect} from "react";
import moment from "moment";
import {useHistory} from 'react-router-dom';
import StudentAbsence from "../../Components/student/StudentAbsence";
import StudentMenu from "../../Components/student/StudentMenu";
import StudentFeedback from "../../Components/student/StudentFeedback"
import firebase from "../../../firebase";
import {vapidKey} from "../../../vapidKey";
import {isAuthenticated} from "../../../util/studentApi";
import {postFCM} from "../../../util/notifApi";
import "./dashboard.css";
import redImage from './raspberries.jpg'
import greenImage from './grapes.jpg'
import blueImage from './blueberry1.jpg'
import orangeImage from './pasta.jpg'
import yellowImage from './mango1.jpg'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import IconButton from '@material-ui/core/IconButton';

const Dashboard=()=>{
const history=useHistory();
const hostelId=isAuthenticated()&&isAuthenticated().hostelId;
const idtoken=isAuthenticated()&&isAuthenticated().studenttoken;

useEffect(()=>{
  applyAccent()
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
      <div className="dashboard__title__wrapper">
        <div>Messmate</div>
        <div>
          STUDENT • GJRBWN 
          <div>
          <IconButton aria-label="delete">
              <PowerSettingsNewIcon
              className="logoutButton"
          />
          </IconButton>
          </div>
        </div>
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

function applyAccent() {
  let accentNum = localStorage.getItem('accentNum') || 0
  let accentCodes = ['235, 50, 50', '0, 200, 33', '232, 232, 0', '0, 96, 206', '255, 61, 12']
  let backgroundImages = [redImage, greenImage, yellowImage, blueImage, orangeImage]
  document.querySelector(':root').style.setProperty('--accent', accentCodes[accentNum])
  document.getElementById('messImg-wrapper').style.backgroundImage = `url(${backgroundImages[accentNum]})`
  document.getElementById('messImg-wrapper').style.backgroundSize = "cover"
  if(window.innerWidth <= 1300) {
    document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
    document.body.style.backgroundSize = "cover"
  }
  document.body.onresize = () => {
    if(window.innerWidth <= 1300) {
      document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
      document.body.style.backgroundSize = "cover"
    }
    else document.body.style.backgroundImage = "none"
  }
}
export default Dashboard;
