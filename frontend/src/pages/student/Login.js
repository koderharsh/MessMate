import React, { useEffect, useState } from "react";
import { login, authenticate } from "../../util/studentApi";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import redImage from "../student/Dashboard/raspberries.jpg";
import greenImage from "../student/Dashboard/grapes.jpg";
import blueImage from "../student/Dashboard/blueberry2.jpg";
import orangeImage from "../student/Dashboard/pasta.jpg";
import yellowImage from "../student/Dashboard/mango1.jpg";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import "./Login.css";

<<<<<<< Updated upstream
import redLogo from '../../logos/redLogo.png'
import greenLogo from '../../logos/greenLogo.png'
import blueLogo from '../../logos/blueLogo.png'
import orangeLogo from '../../logos/orangeLogo.png'
import yellowLogo from '../../logos/yellowLogo.png'

const Login=()=>{

  const  history= useHistory();
=======
const Login = () => {
  const history = useHistory();
>>>>>>> Stashed changes
  //initialised state
  const [student, setStudent] = useState({
    email: "",
    password: "",
    errors: {},
  });

  //destructured
  const { email, password, errors } = student;

  //handle changes in form
  const handleChange = (name) => (event) => {
    setStudent({ ...student, errors: false, [name]: event.target.value });
  };

<<<<<<< Updated upstream
//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStudent({...student,errors:false});
  login({email,password})
  .then(data=>{
    //console.log(data);
    if(data && data.errors){
      setStudent({...student,errors:data.errors})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStudent({
        ...student,
        email:"",
        password:"",
        errors:{}
    })
    history.push('/dashboard/student');
=======
  //handle submit of form
  const handleSubmit = (event) => {
    event.preventDefault();
    setStudent({ ...student, errors: false });
    login({ email, password }).then((data) => {
      //console.log(data);
      if (data.errors) {
        setStudent({ ...student, errors: data.errors });
      } else {
        //on success authenticate by adding token to localstorage
        authenticate(data, () => {
          setStudent({
            ...student,
            email: "",
            password: "",
            errors: {},
          });
          history.push("/dashboard/student");
        });
      }
>>>>>>> Stashed changes
    });
  };

  useEffect(() => {
    applyAccent();
    console.log("yaya dfsdfjkjs");
  }, []);

  //ugly demo
  return (
    <div>
      <div id='dashboard-wrapper'>
<<<<<<< Updated upstream
      <div className="dashboard__title__wrapper">
        <div> 
          <div id="dashboard__logo__wrapper">
            <img src='' />
          </div> 
          Messmate
        </div>
        <div>
          STUDENT
=======
        <div className='dashboard__title__wrapper'>
          <div>Messmate</div>
>>>>>>> Stashed changes
          <div>
            STUDENT
            <div>
              <IconButton
                aria-label='delete'
                onClick={() => {
                  history.push("/");
                }}
              >
                <HomeIcon className='logoutButton' />
              </IconButton>
            </div>
          </div>
        </div>
        <div id='cardgrid'>
          <div className='cardgrid__card' id='card4'>
            <div className='Loginheader'>
              <h3 className='student-card-heading'>Student Login</h3>
            </div>
            <form className='signin_form'>
              <input
                placeholder='Email'
                name='email'
                type='email'
                value={email}
                onChange={handleChange("email")}
              />
              {errors.email && (
                <Typography variant='body2' className='customError'>
                  {errors.email}
                </Typography>
              )}
              <input
                placeholder='Password'
                name='password'
                type='password'
                value={password}
                onChange={handleChange("password")}
              />
              {errors.password && (
                <Typography variant='body2' className='customError'>
                  {errors.password}
                </Typography>
              )}
              {errors.general && (
                <Typography variant='body2' className='customError'>
                  {errors.general}
                </Typography>
              )}
              <Button
                className='login_button'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
              >
                Login{" "}
              </Button>
              <p>
                Don't have an account?{" "}
                <span
                  className='redirect'
                  onClick={() => history.push("/signup/student")}
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div id='messImg-wrapper'>
        <div></div>
      </div>
    </div>
  );
};

function applyAccent() {
<<<<<<< Updated upstream
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
=======
  let accentNum = localStorage.getItem("accentNum") || 0;
  let accentCodes = [
    "235, 50, 50",
    "0, 200, 33",
    "232, 232, 0",
    "0, 96, 206",
    "255, 61, 12",
  ];
  let backgroundImages = [
    redImage,
    greenImage,
    yellowImage,
    blueImage,
    orangeImage,
  ];
  document
    .querySelector(":root")
    .style.setProperty("--accent", accentCodes[accentNum]);
  document.getElementById(
    "messImg-wrapper"
  ).style.backgroundImage = `url(${backgroundImages[accentNum]})`;
  document.getElementById("messImg-wrapper").style.backgroundSize = "cover";
  document.body.style.overflow = "hidden";
  if (window.innerWidth <= 1300) {
    document.body.style.overflow = "auto";
    document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`;
    document.body.style.backgroundSize = "cover";
>>>>>>> Stashed changes
  }
  document.body.onresize = () => {
    if (window.innerWidth <= 1300) {
      document.body.style.overflow = "auto";
      document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`;
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.backgroundImage = "none";
      document.body.style.overflow = "hidden";
    }
<<<<<<< Updated upstream
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

=======
  };
>>>>>>> Stashed changes
}

export default Login;
