import React,{useState} from "react";
import {signup,authenticate} from "../../util/staffApi";
import {useHistory} from 'react-router-dom';
const Signup=()=>{
const history=useHistory();
  //initialised state
  const [staff,setStaff]=useState({
    email:"",
    password:"",
    confirmpassword:"",
    name:"",
    hostel:"",
    hostelId:"",
    error:{}
  });

  //destructured
  const {email,password,confirmpassword,name,hostel,hostelId,error}=staff;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStaff({...staff,error:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setStaff({...staff,error:false});
  signup({email,password,confirmpassword,name,hostel,hostelId})
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
        confirmpassword:"",
        name:"",
        hostel:"",
        hostelId:"",
        error:{}
    })
    });
    history.push("/dashboard/staff")
  }
})
}
//ugly demo
  return(
    <div>
    <form>
    <input name="email" type="email" value={email} onChange={handleChange("email")}/>
    <input name="password" type="password" value={password} onChange={handleChange("password")}/>
    <input name="confirmpassword" type="password" value={confirmpassword} onChange={handleChange("confirmpassword")}/>
    <input name="name" type="text" value={name} onChange={handleChange("name")}/>
    <input name="hostel" type="text" value={hostel} onChange={handleChange("hostel")}/>
    <input name="hostelId" type="text" value={hostelId} onChange={handleChange("hostelId")}/>
    <button type="submit" onClick={handleSubmit}>Signup</button>
    </form>
    </div>
  )
}

export default Signup;
