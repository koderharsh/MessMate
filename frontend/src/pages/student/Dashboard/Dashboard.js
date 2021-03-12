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

import redLogo from '../../../logos/redLogo.png'
import greenLogo from '../../../logos/greenLogo.png'
import blueLogo from '../../../logos/blueLogo.png'
import orangeLogo from '../../../logos/orangeLogo.png'
import yellowLogo from '../../../logos/yellowLogo.png'

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
  }) .catch(err => {console.log(err);})
},[])
firebase.messaging().onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

  return (
    <div id='dashboard-wrapper'>
      <div className="dashboard__title__wrapper">
        <div> 
          <div id="dashboard__logo__wrapper">
            <img src='' />
          </div> 
          Messmate
        </div>
        <div>
          STUDENT • {hostelId}
          <div>
          <IconButton aria-label="delete" onClick={()=>{
              localStorage.removeItem("student");
              history.push("/login/student");
            }}>
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
  let logoImages = [redLogo, greenLogo, yellowLogo, blueLogo, orangeLogo]
  document.querySelector('#dashboard__logo__wrapper > img').src = logoImages[accentNum]
  document.querySelector(':root').style.setProperty('--accent', accentCodes[accentNum])
  document.getElementById('messImg-wrapper').style.backgroundImage = `url(${backgroundImages[accentNum]})`
  document.getElementById('messImg-wrapper').style.backgroundSize = "cover"
  document.body.style.overflow = 'hidden'
  if(window.innerWidth <= 1300) {
    document.body.style.overflow = 'auto'
    document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
    document.body.style.backgroundSize = "cover"
  }
  document.body.onresize = () => {
    if(window.innerWidth <= 1300) {
      document.body.style.overflow = 'auto'
      document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
      document.body.style.backgroundSize = "cover"
    }
    else {
      document.body.style.backgroundImage = "none"
      document.body.style.overflow = 'hidden'
    }
  }
  
  if(accentNum == 4)
  document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'saturate(15) contrast(1) brightness(1) hue-rotate(10deg) opacity(0.8)'
  else if(accentNum == 3) 
  document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'saturate(15) contrast(0.5) brightness(0.8) hue-rotate(40deg) opacity(0.8)'
  else 
  document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'saturate(15) contrast(1) brightness(1) opacity(0.8)'
  if(window.innerWidth <= 1300) document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'brightness(15) saturate(0) contrast(10)'
}
export default Dashboard;
