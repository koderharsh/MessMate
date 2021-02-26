import React,{useEffect,useState} from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import firebase from "../firebase";
const Home=()=>{
  useEffect(()=>{
    const msg=firebase.messaging();
    msg.requestPermission().then(()=>{
      return msg.getToken();
    }).then((data)=>{
      console.log(data)
    })
  },[])
  firebase.messaging().onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  });
  return(
    <div id="dashboard-wrapper">

      <div id="navbar-wrapper">
          <span id="navleft"><i className="lni lni-dinner"></i> MESSMATE</span>
          <span id="navright">
          <Link to="/login/student"><button className="navright_button" >Student</button></Link>
          <Link to="/login/staff"><button className="navright_button" >Staff</button></Link>
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
