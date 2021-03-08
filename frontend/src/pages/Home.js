import React,{useEffect,useState} from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import {isAuthenticated as isStaffAuthenticated} from "../util/staffApi";
import {isAuthenticated as isStudentAuthenticated} from "../util/studentApi";

const Home=()=>{
  return(
    <div id="dashboard-wrapper">

      <div id="navbar-wrapper">
          <span id="navleft"><i className="lni lni-dinner"></i> MESSMATE</span>
          <span id="navright">
            {isStudentAuthenticated()&&isStudentAuthenticated().studenttoken!==""?(
              <Link to="/dashboard/student"><button className="navright_button" >Student</button></Link>
            ):(
                <Link to="/login/student"><button className="navright_button" >Student</button></Link>
            )}
            {isStaffAuthenticated()&&isStaffAuthenticated().stafftoken!==""?(
              <Link to="/dashboard/staff"><button className="navright_button" >Staff</button></Link>
            ):(
                <Link to="/login/staff"><button className="navright_button" >Staff</button></Link>
            )}


          </span>
      </div>

      <div className="home_intro">
         <span className="app_name"><p>Welcome to</p> MessMate</span>
         <div className="app_desc">
           hdfhdabfj fbasfbasjfb adfbbaskjfkajsf ffjbaksjfkajsbf akv askjvajbv  hdfhdabfj fbasfbasjfb adfbbaskjfkajsf ffjbaksjfkajsbf akv hdfhdabfj fbasfbasjfb adfbbaskjfkajsf ffjbaksjfkajsbf akv askjvajbv  hdfhdabfj fbasfbasjfb adf hdfhdabfj fbasfbasjfb adfbbaskjfkajsf ffjbaksjfkajsbf akv askjvajbv  hdfhdabfj fbasfbasjfb adfhdfhdabfj fbasfbasjfb adfbbaskjfkajsf ffjbaksjfkajsbf akv askjvajbv  hdfhdabfj fbasfbasjfb adfhdfhdabfj fbasfbasjfb adfbbaskjfkajsf ffjbaksjfkajsbf akv askjvajbv  hdfhdabfj fbasfbasjfb adf
         </div>
      </div>

      <div id="messImg-wrapper">
          <div></div>
      </div>

  </div>
  )
}

export default Home;
