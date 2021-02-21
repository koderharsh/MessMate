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

//Staff routes
app.post("/signup/staff", staffSignup);
app.post("/login/staff", staffLogin);

//Student Routes
app.post("/signup/student", studentSignup);
app.post("/login/student", studentLogin);

//Response routes
app.get("/responses", isStaff, getResponses);
app.post("/response", isStudent, postResponse);

// Prior absence notif routes.
app.get("/absentees",isStaff,getAbsentees);
app.post("/absentees", isStudent, postAbsentees);

// Rating and review routes.
app.get("/feedback", isStaff, getFeedback);
app.post("/feedback", isStudent, postFeedback);

//Menu Routes

app.post("/menu", isStaff, postMenu);
app.get("/menu", isStudent, getMenu);

exports.api = functions.https.onRequest(app);
