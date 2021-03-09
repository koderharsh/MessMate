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
import Typography from '@material-ui/core/Typography';
const Signup=()=>{
const history=useHistory();
  //initialised state
  const [staff,setStaff]=useState({
    email:"",
    password:"",
    name:"",
    hostelId:"",
    errors:{}
  });

  //destructured
  const {email,password,name,hostelId,errors}=staff;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStaff({...staff,errors:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStaff({...staff,errors:false});
  signup({email,password,name,hostelId})
  .then(data=>{
    //console.log(data);
    if(data.errors){
      setStaff({...staff,errors:data.errors})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStaff({
        ...staff,
        email:"",
        password:"",
        name:"",
        hostelId:"",
        errors:{}
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
            }}>
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
          <input placeholder="Name" name="name" type="text" value={name} onChange={handleChange("name")}/>
          {errors.name&& (<Typography variant="body2" className="customError">
           {errors.name}
         </Typography>)}
           <input placeholder="Email" name="email" type="email" value={email} onChange={handleChange("email")}/>
             {errors.email&& (<Typography variant="body2" className="customError">
              {errors.email}
            </Typography>)}
           <input placeholder="Password" name="password" type="password" value={password} onChange={handleChange("password")}/>
             {errors.password&& (<Typography variant="body2" className="customError">
              {errors.password}
            </Typography>)}
           <input placeholder="HostelId" name="hostelId" type="text" value={hostelId} onChange={handleChange("hostelId")}/>
             {errors.hostelId&& (<Typography variant="body2" className="customError">
              {errors.hostelId}
            </Typography>)}
            {errors.general&& (<Typography variant="body2" className="customError">
             {errors.general}
           </Typography>)}
            <Button className="login_button" variant="contained" color="primary"onClick={handleSubmit}>Signup</Button>
            <p>Already have an accout? <span className="redirect" onClick={() => history.push('/login/staff')}>Sign in</span></p>
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
