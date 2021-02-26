const { admin,db } = require('../admin');
const firebase=require("firebase");

exports.postFCMToken=(req,res)=>{
const newFCMToken={
      token:req.body.token
    };

    db.collection('fcm')
    .add(newFCMToken)
    .then(doc=>{
      res.json({message:"FCM stored"})
    })
    .catch(err=>{
      res.status(500).json({error:"Failed attempt"})
      console.error(err)
    })
}

exports.subscribeToTopic=(req,res)=>{
  const topic="MTB";
  var registrationTokens = ["--paste your token--"];

  admin.messaging().subscribeToTopic(registrationTokens, topic)
    .then(function(response) {

      console.log('Successfully subscribed to topic:', response);
    })
    .catch(function(error) {
      console.log('Error subscribing to topic:', error);
    });

}

exports.sendNotifications=(req,res)=>{
  var topic = 'MTB';

var message = {
  data: {
    title: 'MessMate',
    desciption: 'Demo'
  },
  topic: topic
};

admin.messaging().send(message)
  .then((response) => {

  res.status(200).json(response);
  })
  .catch((error) => {
    console.log(error);
  });

}
