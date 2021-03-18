import React, { useState, useEffect } from "react";
import {
  isAuthenticated,
  postMenu,
  getMenu,
} from "./../../../../util/staffApi";
import "./upcomingmenu.css";

const token = isAuthenticated() && isAuthenticated().stafftoken;

const UpcomingMeal = () => {
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

  const getMenuList = async () => {
    await getMenu(token)
      .then((data) => {
        if (!data.error) {
          console.log(data, "harsh");
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
          const food = "Not Entered Yet";

          setMeal({
            day: data.Day.toUpperCase(),
            mealT: data.timeMeal.toUpperCase(),
            err: data.error,
            foodItem: food,
            desert: food,
          });
        }
      })
      .catch((e) => {
        setMeal({
          day: `Can't Connect`,
          mealT: `Can't Connect`,
          err: e,
          foodItem: `Can't Connect`,
          desert: `Can't Connect`,
        });
      });
  };

  useEffect(() => {
    getMenuList();
  }, []);

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
