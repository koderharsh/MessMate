import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

//import pages
import Home from "./pages/Home";
import StaffSignup from "./pages/staff/Signup";
import StaffLogin from "./pages/staff/Login";
import StudentSignup from "./pages/student/Signup";
import StudentLogin from "./pages/student/Login";
import StaffDashboard from "./pages/staff/Dashboard/Dashboard.js";
import StudentDashboard from "./pages/student/Dashboard/Dashboard";

function App() {
  return (
    <Router>
<div>
<Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/signup/staff" component={StaffSignup}/>
    <Route exact path="/signup/student" component={StudentSignup}/>
    <Route exact path="/login/staff" component={StaffLogin}/>
    <Route exact path="/login/student" component={StudentLogin}/>
     <Route exact path="/dashboard/staff" component={StaffDashboard}/>
    <Route exact path="/dashboard/student" component={StudentDashboard}/>
  </Switch>
  </div>
  </Router>
  );
}

export default App;
