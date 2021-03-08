import React, { useState } from 'react'
import { isAuthenticated, postAbsentee } from "../../../util/studentApi";
import "./studentComponentStyles.css"
import IconButton from '@material-ui/core/IconButton';

function StudentAbsence() {
    const token = isAuthenticated() && isAuthenticated().studenttoken;
    let [meal, setMeal] = useState("breakfast")

    return (
        <div>
            <h3>Planning to skip the mess today?</h3>
            <div className="absence__tiptext">
                 Be sure to inform the mess staff about it.
            </div>
            <div className="absence__form">
                <select name="meal" id="meal" onChange={event => { setMeal(event.target.value) }}>
                    <option value="breakfast">Skipping breakfast today</option>
                    <option value="lunch">Skipping lunch today</option>
                    <option value="dinner">Skipping dinner today</option>
                </select>
                <IconButton component="span" variant="contained" onClick={() => {postAbsentee(token,{meal})}}>
                    <i className="lni lni-chevron-right"></i>
                </IconButton>
            </div>


        </div>
    )
}

export default StudentAbsence
