const { db } = require("../admin");

const postMenu = async (req, res) => {
  try {
    let doc = await db.collection("menu").doc(`${req.user.hostelId}`).get();
    if (!doc.data()) {
      await db
        .collection("menu")
        .doc(`${req.user.hostelId}`)
        .set({
          updatedOn: {},
          sunday: {
            breakfast: {
              foodItem: "",
              desert: "",
            },
            lunch: {
              foodItem: "",
              desert: "",
            },
            dinner: {
              foodItem: "",
              desert: "",
            },
          },
          monday: {
            breakfast: {
              foodItem: "",
              desert: "",
            },
            lunch: {
              foodItem: "",
              desert: "",
            },
            dinner: {
              foodItem: "",
              desert: "",
            },
          },
          tuesday: {
            breakfast: {
              foodItem: "",
              desert: "",
            },
            lunch: {
              foodItem: "",
              desert: "",
            },
            dinner: {
              foodItem: "",
              desert: "",
            },
          },
          wednesday: {
            breakfast: {
              foodItem: "",
              desert: "",
            },
            lunch: {
              foodItem: "",
              desert: "",
            },
            dinner: {
              foodItem: "",
              desert: "",
            },
          },
          thursday: {
            breakfast: {
              foodItem: "",
              desert: "",
            },
            lunch: {
              foodItem: "",
              desert: "",
            },
            dinner: {
              foodItem: "",
              desert: "",
            },
          },
          friday: {
            breakfast: {
              foodItem: "",
              desert: "",
            },
            lunch: {
              foodItem: "",
              desert: "",
            },
            dinner: {
              foodItem: "",
              desert: "",
            },
          },
          saturday: {
            breakfast: {
              foodItem: "",
              desert: "",
            },
            lunch: {
              foodItem: "",
              desert: "",
            },
            dinner: {
              foodItem: "",
              desert: "",
            },
          },
        });
    }

    doc = await db.collection("menu").doc(`${req.user.hostelId}`).get();

    const day = req.body.day;

    const meal = req.body.meal;
    const foodItem = req.body.foodItem;
    const desert = req.body.desert;
    console.log(day, meal, foodItem, desert);

    const currentDate = new Date().toDateString();

    let updateMeal = {};
    updateMeal[`updatedOn`] = currentDate;
    updateMeal[`${day}.${meal}.foodItem`] = foodItem;
    updateMeal[`${day}.${meal}.desert`] = desert;

    try {
      await doc.ref.update(updateMeal);

      res.status(200).json("Menu Uploaded");
    } catch (e) {
      res.status(400).json("Something went Wrong");
    }
  } catch (e) {
    res.status(500).json({ Error: e, Day, timeMeal });
  }
};

const getMenu = async (req, res) => {
  let day = new Date().getDay();
  const datear = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const Day = datear[day];
  let durTime = new Date().getHours();
  console.log(durTime);
  let timeMeal = "";
  if (durTime >= 10 && durTime <= 15) timeMeal = "lunch";
  else if (durTime >= 15 && durTime <= 22) timeMeal = "dinner";
  else timeMeal = "breakfast";

  try {
    let doc = await db.collection("menu").doc(`${req.user.hostelId}`).get();

    if (doc.data()) {
      const Meal = doc.data()[`${Day}`];
      const durMeal = Meal[timeMeal];
      const completeMeal = doc.data();
      res.send({ timeMeal, Meal, durMeal, completeMeal, Day });
    } else {
      res.send({ Error: "Not Entered Yet", timeMeal, Day });
    }
  } catch (e) {
    res
      .status(500)
      .send({ Error: "Problem Connecting to Database", timeMeal, Day });
  }
};

module.exports = { postMenu, getMenu };
