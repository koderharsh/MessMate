import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';


//import pages
import Home from "./pages/home/Home";
import StaffSignup from "./pages/staff/Signup";
import StaffLogin from "./pages/staff/Login";
import StudentSignup from "./pages/student/Signup";
import StudentLogin from "./pages/student/Login";
import StaffDashboard from "./pages/staff/Dashboard/Dashboard.js";
import StudentDashboard from "./pages/student/Dashboard/Dashboard";

//import routes
import StaffRoute from "./routes/StaffRoute";
import StudentRoute from "./routes/StudentRoute";

function App() {
  let num = Math.floor(Math.random() * 5)
  localStorage.setItem('accentNum', num)
  return (
    <Router>
<div>
<Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/signup/staff" component={StaffSignup}/>
    <Route exact path="/signup/student" component={StudentSignup}/>
    <Route exact path="/login/staff" component={StaffLogin}/>
    <Route exact path="/login/student" component={StudentLogin}/>
     <StaffRoute path="/dashboard/staff" exact component={StaffDashboard}/>
    <StudentRoute exact path="/dashboard/student" component={StudentDashboard}/>
  </Switch>
  </div>
  </Router>
  );
}

export default App;
