const admin=require("firebase-admin"); //to use Admin SDK
let serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp( {credential: admin.credential.cert(serviceAccount)});

const db=admin.firestore(); //instance of firestore

module.exports={admin,db};
