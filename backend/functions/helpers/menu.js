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
              foodItem: {},
              desert: {},
            },
            lunch: {
              foodItem: {},
              desert: {},
            },
            dinner: {
              foodItem: {},
              desert: {},
            },
          },
          monday: {
            breakfast: {
              foodItem: {},
              desert: {},
            },
            lunch: {
              foodItem: {},
              desert: {},
            },
            dinner: {
              foodItem: {},
              desert: {},
            },
          },
          tuesday: {
            breakfast: {
              foodItem: {},
              desert: {},
            },
            lunch: {
              foodItem: {},
              desert: {},
            },
            dinner: {
              foodItem: {},
              desert: {},
            },
          },
          wednesday: {
            breakfast: {
              foodItem: {},
              desert: {},
            },
            lunch: {
              foodItem: {},
              desert: {},
            },
            dinner: {
              foodItem: {},
              desert: {},
            },
          },
          thursday: {
            breakfast: {
              foodItem: {},
              desert: {},
            },
            lunch: {
              foodItem: {},
              desert: {},
            },
            dinner: {
              foodItem: {},
              desert: {},
            },
          },
          friday: {
            breakfast: {
              foodItem: {},
              desert: {},
            },
            lunch: {
              foodItem: {},
              desert: {},
            },
            dinner: {
              foodItem: {},
              desert: {},
            },
          },
          saturday: {
            breakfast: {
              foodItem: {},
              desert: {},
            },
            lunch: {
              foodItem: {},
              desert: {},
            },
            dinner: {
              foodItem: {},
              desert: {},
            },
          },
        });
    }

    doc = await db.collection("menu").doc(`${req.user.hostelId}`).get();

    const day = req.body.day;
    const meal = req.body.meal;
    const foodItem = req.body.foodItem;
    const desert = req.body.desert;

    const currentDate = new Date().toDateString();

    let updateMeal = {};
    updateMeal[`updatedOn`] = currentDate;
    updateMeal[`${day}.${meal}.foodItem`] = foodItem;
    updateMeal[`${day}.${meal}.desert`] = desert;

    try {
      await doc.ref.update(updateMeal);

      res.status(200).send("Menu Uploaded");
    } catch (e) {
      res.status(400).send("Something went Wrong");
    }
  } catch (e) {
    res.status(500);
  }
};

const getMenu = async (req, res) => {
  try {
    let doc = await db.collection("menu").doc(`${req.user.hostelId}`).get();
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
    if (!doc.data()) res.status(400).send({ Error: "no records found" });
    const Day = datear[day];

    const Meal = doc.data()[`${Day}`];
    let durTime = new Date().getHours();
    let timeMeal = "";
    if (durTime > 10 && durTime <= 15) timeMeal = "lunch";
    else if (durTime > 15 && durTime <= 22) timeMeal = "dinner";
    else timeMeal = "breakfast";
    const durMeal = Meal[timeMeal];
    console.log(durMeal);
    res.send({ Meal, durMeal });
  } catch (e) {
    res.status(500);
  }
};

module.exports = { postMenu, getMenu };
