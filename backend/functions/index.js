const functions = require("firebase-functions");
const firebase = require("firebase");
const firebaseConfig = require("./firebaseConfig");
firebase.initializeApp(firebaseConfig);

const express = require("express");
const app = express();

const { staffSignup, staffLogin } = require("./helpers/staff");
const { studentSignup, studentLogin } = require("./helpers/students");
const { getResponses, postResponse } = require("./helpers/responses");
const { getAbsentees, postAbsentees } = require("./helpers/absentNotif");
const { postFeedback, getFeedback } = require("./helpers/feedback");
const { postMenu, getMenu } = require("./helpers/menu");

const isStudent = require("./middlewares/isStudent");
const isStaff = require("./middlewares/isStaff");
const testware = require("./middlewares/testware");

//Staff routes
app.post("/signup/staff", staffSignup);
app.post("/login/staff", staffLogin);

//Student Routes
app.post("/signup/student", studentSignup);
app.post("/login/student", studentLogin);

//Response routes
// app.get("/responses", testware, getResponses);
// app.post("/response", testware, postResponse);
app.get("/responses", isStaff, getResponses);
app.post("/response", isStudent, postResponse);

// Prior absence notif routes.
// app.get("/absentees", testware, getAbsentees);
// app.post("/absentees", testware, postAbsentees);
app.get("/absentees", isStaff, testware, getAbsentees);
app.post("/absentees", isStudent, testware, postAbsentees);

// Rating and review routes.
// app.get("/feedback", testware, getFeedback);
// app.post("/feedback", testware, postFeedback);
app.get("/feedback", isStaff, testware, getFeedback);
app.post("/feedback", isStudent, testware, postFeedback);

//Menu Routes

// app.post("/menu", testware, postMenu);
// app.get("/menu/staff", testware, getMenu);
// app.get("/menu/student", testware, getMenu);
app.post("/menu", isStaff, postMenu);
app.get("/menu/staff", isStaff, getMenu);
app.get("/menu/student", isStudent, getMenu);

exports.api = functions.https.onRequest(app);
