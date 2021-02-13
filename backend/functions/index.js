const functions = require("firebase-functions");
const firebase=require("firebase");
const firebaseConfig=require("./firebaseConfig");
firebase.initializeApp(firebaseConfig);

const express=require("express");
const app=express();

const {staffSignup,staffLogin}=require("./helpers/staff");
const {studentSignup,studentLogin}=require("./helpers/students");
const {getResponses,postResponse}=require("./helpers/responses");

const isStudent=require("./middlewares/isStudent");
const isStaff=require("./middlewares/isStaff");

//Staff routes
app.post("/signup/staff",staffSignup);
app.post("/login/staff",staffLogin);

//Student Routes
app.post("/signup/student",studentSignup);
app.post("/login/student",studentLogin);

//Response routes
app.get("/responses",isStaff,getResponses);
app.post("/response",isStudent,postResponse);

exports.api=functions.https.onRequest(app);
