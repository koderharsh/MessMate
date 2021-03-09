import React,{useEffect, useState} from "react";
import {login,authenticate} from "../../util/studentApi";
import {useHistory} from 'react-router-dom'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import IconButton from '@material-ui/core/IconButton';
import redImage from '../student/Dashboard/raspberries.jpg'
import greenImage from '../student/Dashboard/grapes.jpg'
import blueImage from '../student/Dashboard/blueberry2.jpg'
import orangeImage from '../student/Dashboard/pasta.jpg'
import yellowImage from '../student/Dashboard/mango1.jpg' 
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import './Login.css'

const Login=()=>{

  const  history= useHistory();
  //initialised state
  const [student,setStudent]=useState({
    email:"",
    password:"",
    error:{}
  });

  //destructured
  const {email,password,error}=student;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStudent({...student,error:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStudent({...student,error:false});
  login({email,password})
  .then(data=>{
    //console.log(data);
    if(data.error){
      setStudent({...student,error:data.error})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStudent({
        ...student,
        email:"",
        password:"",
        error:{}
    })
    history.push('/dashboard/student');
    });
  }
})
}

useEffect(() => {
  applyAccent()
  console.log("yaya dfsdfjkjs");
}, []);

//ugly demo
  return(
    <div>
      <div id='dashboard-wrapper'>
      <div className="dashboard__title__wrapper">
        <div>Messmate</div>
        <div>
          STUDENT • 
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
        <div className='cardgrid__card' id='card4'>
        <div className="Loginheader">
            <h3 className="student-card-heading">Student Login</h3>
        </div>
          <form className="signin_form">
              <input placeholder="email ID" name="email" type="email" value={email} onChange={handleChange("email")}/>
              <input placeholder="password" name="password" type="password" value={password} onChange={handleChange("password")}/>
              <Button className="login_button" variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleSubmit} >Login  </Button>
          </form>
        </div>
      </div>
    </div>
    <div id='messImg-wrapper'>
        <div></div>
      </div>
   
    </div>
  )
}

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

export default Login;
