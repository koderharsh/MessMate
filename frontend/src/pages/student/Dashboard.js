import React,{useState,useEffect} from "react";
import {isAuthenticated,postAbsentee,postFeedback,getMenu} from "../../util/studentApi";
import firebase from "../../firebase";
import {vapidKey} from "../../vapidKey";
import {postFCM} from "../../util/notifApi";

const Dashboard=()=>{
  const idtoken=isAuthenticated()&&isAuthenticated().studenttoken;
  const [absentee,setAbsentee]=useState("");
  useEffect(()=>{
    const msg=firebase.messaging();
    msg.requestPermission().then(()=>{
      return msg.getToken({ vapidKey});
    }).then((data)=>{
      //console.log(data)
      if(localStorage.getItem("fcm")){
        if(JSON.parse(localStorage.getItem("fcm"))===data)
        console.log("Already in db")
        else {
          localStorage.removeItem("fcm");
          localStorage.setItem("fcm",JSON.stringify(data))
          postFCM(idtoken,{token:data})
        }
      }else{
          localStorage.setItem("fcm",JSON.stringify(data))
          postFCM(idtoken,{token:data})
      }
    })
  },[])
  firebase.messaging().onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  });

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
    postAbsentee(idtoken,absentee)
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
  postFeedback(idtoken,{meal,rating,review})
  .then((data,err)=>{
    if(err)
    console.log(err)
    else{
      setFeedback({meal:"",rating:"",review:""})
    }
  })
}

const getmenu=()=>{
  getMenu(idtoken)
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
      <div id="navbar-wrapper">
          <span id="navleft"><i className="lni lni-dinner"></i> MESSMATE</span>
          <span id="navright">
          </span>
      </div>
    {isAuthenticated()?(
      <div>
    Authenticated user
    </div>):null}
  </div>
  )
}

export default Dashboard;
