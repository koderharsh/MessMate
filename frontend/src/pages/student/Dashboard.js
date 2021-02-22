import React,{useState,useEffect} from "react";
import {isAuthenticated,postAbsentee,postFeedback,getMenu} from "../../util/studentApi";

const Dashboard=()=>{
  const token=isAuthenticated()&&isAuthenticated().studenttoken;
  const [absentee,setAbsentee]=useState("");

  const [feedback,setFeedback]=useState({
    meal:"",
    rating:"",
    review:""
  });

  const {meal,rating,review}=feedback;

  const [menu,setMenu]=useState({});

  const handleAbsentee=(name)=>(event)=>{
    setAbsentee({[name]:event.target.value});
  };

  const postAbsenteeList=(event)=>{
    event.preventDefault()
    setAbsentee(...absentee);
    postAbsentee(token,absentee)
    .then((data,err)=>{
    if(err)
    console.log(err)
    else {
    setAbsentee("")
    }
    })
  }

  const handleFeedback=(name)=>(event)=>{
    setFeedback({...feedback,[name]:event.target.value});
  };

const postStudentFeedback=(event)=>{
  event.preventDefault()
  setAbsentee({...feedback});
  postFeedback(token,{meal,rating,review})
  .then((data,err)=>{
    if(err)
    console.log(err)
    else{
      setFeedback({meal:"",rating:"",review:""})
    }
  })
}

const getmenu=()=>{
  getMenu(token)
  .then((data,err)=>{
    if(err)
    console.log(err)
    else {
      setMenu(data)
    }
  })
}

return(
    <div>
    {isAuthenticated()?(
      <div>
    Authenticated user
    </div>):null}
  </div>
  )
}

export default Dashboard;
