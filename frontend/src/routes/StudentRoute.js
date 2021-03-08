import React,{Component} from "react";
import {Route,Redirect} from "react-router-dom";
import {isAuthenticated as isStudentAuthenticated} from "../util/studentApi";

const StudentRoute=({component:Component,...rest})=>(
  <Route {...rest} render={props=>isStudentAuthenticated()?(
    <Component {...props}/>
  ):(
    <Redirect to={{pathname:"/",state:{from:props.location}}}/>
  )}/>
)

export default StudentRoute;
