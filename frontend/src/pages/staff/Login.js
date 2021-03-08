import React,{useState} from "react";
import {login,authenticate} from "../../util/staffApi";
import {useHistory} from 'react-router-dom'

const Login=()=>{

  const history=useHistory();

  //initialised state
  const [staff,setStaff]=useState({
    email:"",
    password:"",
    error:{}
  });

  //destructured
  const {email,password,error}=staff;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStaff({...staff,error:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStaff({...staff,error:false});
  login({email,password})
  .then(data=>{
    //console.log(data);
    if(data.error){
      setStaff({...staff,error:data.error})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStaff({
        ...staff,
        email:"",
        password:"",
        error:{}
    })
    history.push('/dashboard/staff');
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
