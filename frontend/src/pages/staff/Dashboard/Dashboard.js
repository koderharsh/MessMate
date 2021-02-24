import React, { useState, useEffect } from "react";
import { isAuthenticated, getAbsentees, getFeedback, postMenu } from "../../../util/staffApi";
import './dashboard.css'

const Dashboard = () => {
  const token = isAuthenticated() && isAuthenticated().stafftoken;
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
    desert: ""
  });

  const { day, meal, foodItem, desert } = menu;


  const getAbsenteeList = () => {
    getAbsentees(token)
      .then((data, err) => {
        if (err)
          console.log(err)
        else {
          setAbsentees({ breakfast: data.breakfast, lunch: data.lunch, dinner: data.dinner })
          console.log('absentee response', data);
        }
      })
  }

  const getStudentFeedback = () => {
    getFeedback(token)
      .then((data, err) => {
        if (err)
          console.log(err)
        else {
          console.log('feedback response',data);
          setFeedback({ breakfast: data.breakfast, lunch: data.lunch, dinner: data.dinner })
        }
      })
  }

  //handle changes in form
  const handleChange = (name) => (event) => {
    setMenu({ ...menu, [name]: event.target.value });
  };

  //handle submit of form
  const handleSubmit = (event) => {
    event.preventDefault()
    setMenu({ ...menu });
    postMenu(token, { day, meal, foodItem, desert })
      .then(data => {
        //console.log(data);
        if (data.error) {
          setMenu({ ...menu, error: data.error })
        } else {
          setMenu({
            day: "",
            meal: "",
            foodItem: "",
            desert: ""
          })
        }
      })
  }

  useEffect(() => {
    getAbsenteeList();
    getStudentFeedback();
  }, [])
  
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
  <div id="dashboard-wrapper">

      <div id="navbar-wrapper">
          <span id="navleft"><i className="lni lni-dinner"></i> MESSMATE</span>
          <span id="navright">8:42PM | GJRBWN <i className="lni lni-power-switch"></i></span>
      </div>

      <div id="cardgrid">
          <div className="cardgrid__card" id="card1">
              <h2>TOTAL ABSENTEES : 35</h2>
              <h3>Breakfast:5</h3>
              <h3>Lunch:10 </h3>
              <h3>Dinner:20</h3>

          </div>
          <div className="cardgrid__card" id="card2">
          <h2>TODAY'S MENU</h2>
              <h3>Breakfast: </h3>
              <h3>Lunch:10 </h3>
              <h3>Dinner:20</h3>
          </div>
          <div className="cardgrid__card" id="card3">
              <h2>RATINGS AND REVIEWS</h2>
          </div>
      </div>

      <div id="messImg-wrapper">
          <div></div>
      </div>

  </div>
)

}

export default Dashboard;
