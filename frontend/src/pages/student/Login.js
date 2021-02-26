import React,{useState} from "react";
import {login,authenticate} from "../../util/studentApi";
import {useHistory} from 'react-router-dom'

const Login=()=>{

  const  history= useHistory();
  //initialised state
  const [student,setStudent]=useState({
    email:"",
    password:"",
    error:{}
  });

  //destructured
  const {email,password,error}=student;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStudent({...student,error:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStudent({...student,error:false});
  login({email,password})
  .then(data=>{
    //console.log(data);
    if(data.error){
      setStudent({...student,error:data.error})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStudent({
        ...student,
        email:"",
        password:"",
        error:{}
    })
    history.push('/dashboard/login');
    });
  }
})
}
//ugly demo
  return(
    <div>
      <div id="navbar-wrapper">
          <span id="navleft"><i className="lni lni-dinner"></i> MESSMATE</span>
          <span id="navright">
          </span>
      </div>
    <form>
    <input name="email" type="email" value={email} onChange={handleChange("email")}/>
    <input name="password" type="password" value={password} onChange={handleChange("password")}/>
    <button type="submit" onClick={handleSubmit}>Login</button>
    </form>
    </div>
  )
}

export default Login;
