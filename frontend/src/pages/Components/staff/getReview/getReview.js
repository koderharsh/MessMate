import React, { useState, useEffect } from "react";
import { isAuthenticated, getFeedback } from "./../../../../util/staffApi";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";
import FilterDramaOutlinedIcon from "@material-ui/icons/FilterDramaOutlined";

import "./getReview.css";

const token = isAuthenticated() && isAuthenticated().stafftoken;

const GetReview = () => {
  const [feedback, setFeedback] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const getFeedbackList = () => {
    getFeedback(token)
      .then((data) => {
        setFeedback({
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFeedbackList();
  }, []);

  const renderBreakfast = () => {
    const reviews = feedback.breakfast.reviews;
    return (
      <div className='review_grid_card breakfast'>
        <div className='menu__mealname menu_mealname'>
          Breakfast <FilterDramaOutlinedIcon className='icon' />
          <p className='size'>
            Student Count : {feedback.breakfast.rating.ratingCount}
          </p>
          <p className='size'>
            Average Rating : {feedback.breakfast.rating.ratingAverage}
          </p>
        </div>
        {reviews.map((reviewStu) => (
          <div className='menu__card review_card'>
            <p>StudentId {reviewStu.studentId}</p>
            <p>{reviewStu.review}</p>
          </div>
        ))}
      </div>
    );
  };
  const renderLunch = () => {
    const reviews = feedback.lunch.reviews;
    return (
      <div className='review_grid_card lunch'>
        <div className='menu__mealname menu_mealname'>
          Lunch <WbSunnyOutlinedIcon className='icon' />
          <p className='size'>
            Student Count : {feedback.lunch.rating.ratingCount}
          </p>
          <p className='size'>
            Average Rating : {feedback.lunch.rating.ratingAverage}
          </p>
        </div>
        {reviews.map((reviewStu) => (
          <div className='menu__card review_card'>
            <p>StudentId {reviewStu.studentId}</p>
            <p>{reviewStu.review}</p>
          </div>
        ))}
      </div>
    );
  };
  const renderDinner = () => {
    const reviews = feedback.dinner.reviews;
    return (
      <div className='review_grid_card dinner'>
        <div className='menu__mealname menu_mealname'>
          Dinner <NightsStayOutlinedIcon className='icon' />
          <p className='size'>
            Student Count : {feedback.dinner.rating.ratingCount}
          </p>
          <p className='size'>
            Average Rating : {feedback.dinner.rating.ratingAverage}
          </p>
        </div>
        {reviews.map((reviewStu) => (
          <div className='menu__card review_card'>
            <p>StudentId {reviewStu.studentId}</p>
            <p>{reviewStu.review}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div class='menu__grid '>
      {feedback?.breakfast?.rating && renderBreakfast()}
      {feedback?.lunch?.rating && renderLunch()}
      {feedback?.dinner?.rating && renderDinner()}
    </div>
  );
};

export default GetReview;
