import React, { useState, useEffect } from "react";
import {
  isAuthenticated,
  postMenu,
  getMenu,
} from "./../../../../util/staffApi";
import "./upcomingmenu.css";

const UpcomingMeal = () => {
  const token = isAuthenticated() && isAuthenticated().stafftoken;

  let [meal, setMeal] = useState({
    day: "",
    mealT: "",
    foodItem: "",
    desert: "",
    err: "",
  });
  const rendered = () => {
    let Maincourse = meal.foodItem;
    let desert = meal.desert;
    return (
      <div>
        <p>
          <u>Main Course</u>
        </p>
        <p>{Maincourse}</p>
        <p>
          <u>Desert</u>
        </p>
        <p>{desert}</p>
      </div>
    );
  };

  const getMenuList = (token) => {
    getMenu(token)
      .then((data) => {
        if (!data.error) {
          console.log(data, "no error");
          setMeal({
            ...meal,
            day: data.Day.toUpperCase(),
            mealT: data.timeMeal.toUpperCase(),
            foodItem: data.durMeal.foodItem
              ? data.durMeal.foodItem.toUpperCase()
              : "Not Entered Yet",
            desert: data.durMeal.desert
              ? data.durMeal.desert.toUpperCase()
              : "Not Entered Yet",
          });
        } else {
          const food = "Not entered yet";
          console.log(data.error, "e2");

          // setMeal({
          //   day: data.Day.toUpperCase(),
          //   mealT: data.timeMeal.toUpperCase(),
          //   err: data.error,
          //   foodItem: food,
          //   desert: food,
          // });
        }
      })
      .catch((e) => {
        console.log(e, "e3");
        // setMeal({
        //   day: `Can't Connect`,
        //   mealT: `Can't Connect`,
        //   err: e,
        //   foodItem: `Can't Connect`,
        //   desert: `Can't Connect`,
        // });
      });
  };

  useEffect(async () => {
    try {
      await getMenuList(token);
    } catch (err) {
      console.log(err);
    }
  }, [meal]);

  return (
    <div className='menu-box'>
      <div className='box'>
        <p>{meal.day}</p>
        <p>{meal.mealT}</p>
        <div className='left'>{rendered()}</div>
      </div>
    </div>
  );
};

export default UpcomingMeal;
