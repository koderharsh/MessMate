import React, { useState, useEffect } from "react";
import {
  isAuthenticated,
  getAbsentees,
  getFeedback,
  postMenu,
  getMenu,
} from "../../../util/staffApi";
import {
postStaffNotification
} from "../../../util/notifApi";
import {useHistory} from "react-router-dom";
// import "./dashboard.css";
// import "./dashboard.css";
import UpcomingMeal from "../../Components/staff/upcoming menu/upcomingmenu";
import EditModal from "../../Components/staff/editMenuModal/editmodal";
import Review from "./Review";

import "../../student/Dashboard/dashboard.css"
import redImage from '../../student/Dashboard/raspberries.jpg'
import greenImage from '../../student/Dashboard/grapes.jpg'
import blueImage from '../../student/Dashboard/blueberry1.jpg'
import orangeImage from '../../student/Dashboard/pasta.jpg'
import yellowImage from '../../student/Dashboard/mango1.jpg'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import IconButton from '@material-ui/core/IconButton';

import Announcements from "../../Components/staff/Announcements";

const Dashboard = () => {
  const history=useHistory();
  const token = isAuthenticated() && isAuthenticated().stafftoken;
  const hostelId = isAuthenticated() && isAuthenticated().hostelId;
  const [absentees, setAbsentees] = useState({
    breakfast: {},
    lunch: {},
    dinner: {},
  });

  const [feedback, setFeedback] = useState({
    breakfast: {},
    lunch: {},
    dinner: {},
  });

  const [menu, setMenu] = useState({
    day: "",
    meal: "",
    foodItem: "",
    desert: "",
  });


//to post body of notification by staff
  const [description,setDescription]=useState("");

  const { day, meal, foodItem, desert } = menu;

  const getAbsenteeList = () => {
    getAbsentees(token).data?.then((data, err) => {
      if (err) console.log(err);
      else {
        setAbsentees({
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner,
        });
        console.log("absentee response", data);
      }
    });
  };

  const getStudentFeedback = () => {
    getFeedback(token).then((data, err) => {
      if (err) console.log(err);
      else {
        console.log("feedback response", data);
        setFeedback({
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner,
        });
      }
    });
  };

  //handle changes in form
  const handleChange = (name) => (event) => {
    setMenu({ ...menu, [name]: event.target.value });
  };

  //handle submit of form
  const handleSubmit = (event) => {
    event.preventDefault();
    setMenu({ ...menu });
    postMenu(token, { day, meal, foodItem, desert }).then((data) => {
      //console.log(data);
      if (data.error) {
        setMenu({ ...menu, error: data.error });
      } else {
        setMenu({
          day: "",
          meal: "",
          foodItem: "",
          desert: "",
        });
      }
    });
  };

  const handleNotifChange=(event)=>{
    setDescription(event.target.value)
  }

  const postNotif=(event)=>{
    event.preventDefault();
    postStaffNotification(token,{description}).then((data)=>{
      if(data.error){
        console.log(data.error)
      }else{
        console.log("Notifications send successfully!!")
      }
    })
  }

  useEffect(() => {
    applyAccent()
    console.log("yaya dfsdfjkjs");
    getAbsenteeList();
    getStudentFeedback();
  }, []);

  // return (
  //   <div>
  //     {isAuthenticated() ? (
  //       <div>
  //         <h4>Absentees</h4>
  //         <li>breakfast:{absentees.breakfast.count}</li>
  //         <li>lunch:{absentees.lunch.count}</li>
  //         <li>dinner:{absentees.dinner.count}</li>
  //       </div>) : null}
  //   </div>
  // )
  //
  //
  //
  //
  //
  //   ACTUAL RENDER TEMPLATE:
  //
  //
  //
  //

  return (
    <div id='dashboard-wrapper'>
      <div className="dashboard__title__wrapper">
        <div>Messmate</div>
        <div>
          STAFF • {hostelId}
          <div>
          <IconButton aria-label="delete" onClick={()=>{
              localStorage.removeItem("staff");
              history.push("/login/staff");
            }}>
              <PowerSettingsNewIcon
              className="logoutButton"
          />
          </IconButton>
          </div>
        </div>
      </div>

      <div id='cardgrid' class='staff__cardGrid'>
         <div className='cardgrid__card' id='card1'>
           {/* <Announcements/> */}
           
          {/* <h2>TOTAL ABSENTEES : {absentees?.breakfast.count}</h2>
          <h3>
            Breakfast:
            {absentees?.breakfast.count +
              absentees?.lunch.count +
              absentees?.dinner.count}
          </h3>
          <h3>Lunch:{absentees?.lunch.count} </h3>
          <h3>Dinner:{absentees?.dinner.count}</h3> */}
        </div>
        <div className='cardgrid__card' id='card2'>
          {/* <UpcomingMeal />  */}
           {/* <EditModal /> */}
        </div>
        <div className='cardgrid__card' id='card3'>
          <Announcements/>
          {/* {feedback.breakfast.rating.ratingAverage}  */}
        </div>
        <div className='cardgrid__card' id='card5'>
          <h2>RATINGS AND REVIEWS</h2>
          {/* {feedback.breakfast.rating.ratingAverage}  */}
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
}

export default Dashboard;
