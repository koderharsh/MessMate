import React,{useState,useEffect} from "react";
import {isAuthenticated,getAbsentees,getFeedback,postMenu} from "../../util/staffApi";

const Dashboard=()=>{
  const token=isAuthenticated()&&isAuthenticated().stafftoken;
  const [absentees,setAbsentees]=useState({
    breakfast:{},
    lunch:{},
    dinner:{},
  });

  const [feedback,setFeedback]=useState({
    breakfast:{},
    lunch:{},
    dinner:{},
  });

  const [menu,setMenu]=useState({
    day:"",
    meal:"",
    foodItem:"",
    desert:""
  });

  const {day,meal,foodItem,desert}=menu;


  const getAbsenteeList=()=>{
    getAbsentees(token)
    .then((data,err)=>{
    if(err)
    console.log(err)
    else {
    setAbsentees({breakfast:data.breakfast,lunch:data.lunch,dinner:data.dinner})
    }
    })
  }

const getStudentFeedback=()=>{
  getFeedback(token)
  .then((data,err)=>{
    if(err)
    console.log(err)
    else{
      console.log(data);
      setFeedback({breakfast:data.breakfast,lunch:data.lunch,dinner:data.dinner})
    }
  })
}

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setMenu({...menu,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
  setMenu({...menu});
  postMenu(token,{day,meal,foodItem,desert})
  .then(data=>{
    //console.log(data);
    if(data.error){
      setMenu({...menu,error:data.error})
    }else{
    setMenu({
      day:"",
      meal:"",
      foodItem:"",
      desert:""
    })
  }
})
}

  useEffect(()=>{
    getAbsenteeList();
    getStudentFeedback();
  },[])
  return(
    <div>
    {isAuthenticated()?(
      <div>
      <h4>Absentees</h4>
      <li>breakfast:{absentees.breakfast.count}</li>
        <li>lunch:{absentees.lunch.count}</li>
          <li>dinner:{absentees.dinner.count}</li>
    </div>):null}
  </div>
  )
}

export default Dashboard;
