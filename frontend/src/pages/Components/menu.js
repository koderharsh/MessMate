import React, { useState, useEffect } from "react";
import { isAuthenticated, postMenu, getMenu } from "../../util/staffApi";

const token = isAuthenticated() && isAuthenticated().stafftoken;

let timelyMeal = "";

const UpcomingMeal = () => {
  const [meal, setMeal] = useState({
    foodItem: "",
    desert: "",
  });

  const getMenuList = () => {
    getMenu(token).then((data) => {
      setMeal({
        foodItem: data.durMeal.foodItem,
        desert: data.durMeal.desert,
      });
    });
  };

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <div>
      <h2>Upcoming Meal</h2>
      <h3>Food : {meal.foodItem}</h3>
      <h3>Desert : {meal.desert}</h3>
    </div>
  );
};

export default UpcomingMeal;
