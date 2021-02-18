const admin=require("firebase-admin"); //to use Admin SDK
admin.initializeApp();

const db=admin.firestore(); //instance of firestore

module.exports={admin,db};
