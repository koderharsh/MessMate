import React, { useState, useEffect } from "react";
import { isAuthenticated, postMenu, getMenu } from "../../../../util/staffApi";
import "./upcomingmenu.css";

const token = isAuthenticated() && isAuthenticated().stafftoken;

const UpcomingMeal = () => {
  const rendered = () => {
    if (meal.err) return <p>Menu not added yet</p>;
    else {
      return (
        <div>
          <p>FoodItem: {meal.foodItem}</p>
          <p>Desert: {meal.desert}</p>
        </div>
      );
    }
  };

  const [meal, setMeal] = useState({
    day: "",
    mealT: "",
    foodItem: "",
    desert: "",
    err: "",
  });

  const getMenuList = () => {
    getMenu(token).then((data, err) => {
      if (err) {
        setMeal({
          err: "Error",
        });
      } else {
        setMeal({
          day: data.Day.toUpperCase(),
          mealT: data.timeMeal.toUpperCase(),
          foodItem: data.durMeal.foodItem.toUpperCase(),
          desert: data.durMeal.desert.toUpperCase(),
        });
      }
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
        {rendered()}
      </div>
    </div>
  );
};

export default UpcomingMeal;
