const functions = require("firebase-functions");
const firebase = require("firebase");
const firebaseConfig = require("./firebaseConfig");
firebase.initializeApp(firebaseConfig);

require('dotenv').config()
const express = require("express");
const app = express();

const { staffSignup, staffLogin } = require("./helpers/staff");
const { studentSignup, studentLogin } = require("./helpers/students");
const { getAbsentees, postAbsentees } = require("./helpers/absentNotif");
const { postFeedback, getFeedback } = require("./helpers/feedback");
const { postMenu, getMenu } = require("./helpers/menu");
const {postFCMToken,sendNotification} = require("./helpers/notifications");
const {postStaffNotification} = require("./helpers/staffNotification");

const isStudent = require("./middlewares/isStudent");
const isStaff = require("./middlewares/isStaff");
const testware = require("./middlewares/testware");

//Staff routes
app.post("/signup/staff", staffSignup);
app.post("/login/staff", staffLogin);

//Student Routes
app.post("/signup/student", studentSignup);
app.post("/login/student", studentLogin);

// Prior absence notif routes.
app.get("/absentees", isStaff, getAbsentees);
app.post("/absentees", isStudent, postAbsentees);

// Rating and review routes.
app.get("/feedback", isStaff, getFeedback);
app.post("/feedback", isStudent, postFeedback);

//Menu Routes
app.post("/menu", isStaff, postMenu);
app.get("/menu/staff", isStaff, getMenu);
app.get("/menu/student", isStudent, getMenu);

//Notifications routes
app.post("/fcm",isStudent,postFCMToken);
app.get("/notifications",sendNotification);
app.post("/notifications",sendNotification);

//Staff notification routes
app.post("/staffnotif",isStaff,postStaffNotification);

exports.api = functions.https.onRequest(app);
