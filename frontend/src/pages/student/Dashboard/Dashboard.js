import React from "react";

import StudentAbsence from "../../Components/student/StudentAbsence"
import StudentMenu from "../../Components/student/StudentMenu"
import StudentFeedback from "../../Components/student/StudentFeedback"
import "./dashboard.css";

const Dashboard=()=>{

  return (
    <div id='dashboard-wrapper'>
      <div id='navbar-wrapper'>
        <span id='navleft'>
          <i className='lni lni-dinner'></i> MESSMATE
        </span>
        <span id='navright'>
          8:42PM | GJRBWN <i className='lni lni-power-switch'></i>
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
