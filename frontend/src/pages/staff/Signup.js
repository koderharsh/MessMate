import React,{useEffect, useState} from "react";
import {signup,authenticate} from "../../util/staffApi";
import {useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import redImage from '../student/Dashboard/raspberries.jpg'
import greenImage from '../student/Dashboard/grapes.jpg'
import blueImage from '../student/Dashboard/blueberry2.jpg'
import orangeImage from '../student/Dashboard/pasta.jpg'
import yellowImage from '../student/Dashboard/mango1.jpg' 
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
const Signup=()=>{
const history=useHistory();
  //initialised state
  const [staff,setStaff]=useState({
    email:"",
    password:"",
    confirmpassword:"",
    name:"",
    hostel:"",
    hostelId:"",
    error:{}
  });

  //destructured
  const {email,password,confirmpassword,name,hostel,hostelId,error}=staff;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStaff({...staff,error:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStaff({...staff,error:false});
  signup({email,password,confirmpassword,name,hostel,hostelId})
  .then(data=>{
    //console.log(data);
    if(data.error){
      setStaff({...staff,error:data.error})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStaff({
        ...staff,
        email:"",
        password:"",
        confirmpassword:"",
        name:"",
        hostel:"",
        hostelId:"",
        error:{}
    })
    });
    history.push("/dashboard/staff")
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
          STUDENT 
          <div>
          <IconButton aria-label="delete" onClick={()=>{
              history.push("/");
            }}><ArrowBackIcon/>
            <HomeIcon
            className="logoutButton"
        />
          </IconButton>
          </div>
        </div>
      </div>
      <div id='cardgrid'>
        <div className='cardgrid__card' id='card4'>
        <div className="Loginheader">
            <h3 className="student-card-heading">Staff Signup</h3>
        </div>
        <form className="signup_form">
            <input placeholder="email" name="email" type="email" value={email} onChange={handleChange("email")}/>
            <input placeholder="password" name="password" type="password" value={password} onChange={handleChange("password")}/>
            <input placeholder="confirm_password" name="confirmpassword" type="password" value={confirmpassword} onChange={handleChange("confirmpassword")}/>
            <input placeholder="name" name="name" type="text" value={name} onChange={handleChange("name")}/>
            <input placeholder="hostel" name="hostel" type="text" value={hostel} onChange={handleChange("hostel")}/>
            <input placeholder="hostelId" name="hostelId" type="text" value={hostelId} onChange={handleChange("hostelId")}/>
            <Button className="login_button" variant="contained" color="primary" endIcon={<SendIcon />}  onClick={handleSubmit}>Signup</Button>
            <p>Already have an accout? <span className="redirect" onClick={() => history.push('../login/staff')}>Sign in</span></p>
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

export default Signup;
