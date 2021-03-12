import React, { useState,useEffect} from 'react'
import { isAuthenticated, getAbsentees } from "../../../util/staffApi";
import "../student/studentComponentStyles.css"
import IconButton from '@material-ui/core/IconButton';
import { PieChart } from 'react-minimal-pie-chart';

const Absentees=()=>{
  const token=isAuthenticated()&&isAuthenticated().stafftoken;


  const [total,setTotal]=useState("");
  const [meal,setMeal]=useState("");
  const [val,setVal]=useState("");
  const lineWidth = 60;

  useEffect(()=>{
    getAbsentees(token)
    .then((data,error)=>{
      if(error)
      console.log(error)
      else{
        console.log(data)
        setTotal(data.total);

        const hour=new Date().getHours();
        if(hour<10){
        setMeal("Breakfast");
        setVal(data.breakfast.count);
      }
        else if(hour>=10&&hour<=15){
            setMeal("Lunch");
            setVal(data.lunch.count);
        }

        else {
          setMeal("Dinner");
          setVal(data.dinner.count);
        }

      }
    })
  },[])
  return(
    <div>
        <h3 className="student-card-heading">Absentees for {meal}</h3>
        <PieChart
data={[
 { title: 'Absentees', value:val, color: 'rgba( 32, 31, 31, 0.50 )' },
 { title: 'Attendees', value: total-val, color: 'rgba(var(--accent), 0.9)' },
]}
style={{
       fontFamily:
         '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
       fontSize: '6px',
     }}
     radius={35}
     lineWidth={60}
     segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
     animate
     label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
     labelPosition={100 - lineWidth / 2}
     labelStyle={{
       fill: '#fff',
       opacity: 0.75,
       pointerEvents: 'none',
     }}

/>
    </div>
  )
}


export default Absentees
