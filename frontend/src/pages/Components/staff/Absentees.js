import React, { useState,useEffect} from 'react'
import { isAuthenticated, getAbsentees } from "../../../util/staffApi";
import "../student/studentComponentStyles.css"
import IconButton from '@material-ui/core/IconButton';
import { PieChart } from 'react-minimal-pie-chart';
import Typography from '@material-ui/core/Typography';

const Absentees=()=>{
  const token=isAuthenticated()&&isAuthenticated().stafftoken;


  const [total,setTotal]=useState("");
  const [meal,setMeal]=useState("");
  const [val,setVal]=useState("");
  const [error,setError]=useState("");
  const lineWidth = 60;

  useEffect(()=>{
    const hour=new Date().getHours();
    if(hour<10){
    setMeal("Breakfast");
  }
    else if(hour>=10&&hour<=15){
        setMeal("Lunch");
    }

    else {
      setMeal("Dinner");
    }
    getAbsentees(token)
    .then((data)=>{
      if(data && data.error)
      setError(data.error)
      else{
        //console.log(data)
        setTotal(data.total);
        if(hour<10){
        setVal(data.breakfast.count);
      }
        else if(hour>=10&&hour<=15){
            setVal(data.lunch.count);
        }

        else {
          setVal(data.dinner.count);
        }

      }
    })
  },[])
  return(
    <div>
        <h3 className="student-card-heading">Absentees for {meal}</h3>
        {error?(  <div className="absence__tiptext">
               No records found!!
          </div>):(<div>
            <div className="absence__tiptext">
                  Number of absentees: {val}
              </div>
              <div id="absentee__chart-wrapper">
          <PieChart
  data={[
   { title: 'Absentees', value:val, color: 'rgba( 32, 31, 31, 0.50 )' },
   { title: 'Attendees', value: total-val, color: 'rgba(var(--accent), 0.9)' },
  ]}
  style={{
    marginTop:-50,
         fontFamily:
           '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
         fontSize: '6px',
       }}
       radius={30}
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
</div>
        )}

    </div>
  )
}


export default Absentees
