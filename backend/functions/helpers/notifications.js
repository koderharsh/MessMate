const { admin,db } = require('../admin');
const firebase=require("firebase");
const { schedule } = require('firebase-functions/lib/providers/pubsub');
const axios = require('axios').default;
axios.defaults.headers.common['Postbacks-Authorization'] = process.env.POSTBACKSAPIKEY;

exports.postFCMToken=(req,res)=>{
const newFCMToken={
      token:req.body.token,
      hostelId:req.user.hostelId
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

exports.sendNotification=(req,res)=>{
  /*const topicName="Students";
  var registrationTokens = ["cFATX5DMY6ZcW5x7Grp4yv:APA91bH8nkanmeMcyp5hRZh0yiy1HWHQqf2324nAammuTXNHS8c1rbqXfsH7F8uitk808OQKGBqpuShX49Lb9ahR-pVfhQnaiI4hkNjxgyNNToAP8BBvjnjrE3qNidAOlwEoHYiJCqHm"];

  admin.messaging().subscribeToTopic(registrationTokens, topicName)
    .then(function(response) {

      console.log('Successfully subscribed to topic:', response);
    })
    .catch(function(error) {
      console.log('Error subscribing to topic:', error);
    });*/
    db.collection('fcm')
    .get()
    .then(data=>{
      let registrationTokens=[];
      data.forEach(doc=>{
        registrationTokens.push(doc.data().token);

      });
      return registrationTokens;
    }).then(registrationTokens=>{
      admin.messaging().subscribeToTopic(registrationTokens, 'Students')
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
          console.log('Error subscribing to topic:', error);
        })
        .then((response)=>{
          var message = {
            notification: {
              title: 'MessMate',
              body: `${decodeURI(req.query.notifcontent) || 'Please send your response!!'}`,
            },
            topic: 'Students',
          };

          admin.messaging().send(message)
            .then((response) => {
              // Response is a message ID string.
              return res.json(response)
            })
            .then(scheduleNextNotification)
            .catch((error) => {
              console.log('Error sending message:', error);
            });
        })

    })
    .catch(err=>console.error(err));

}

async function scheduleNextNotification() {
  let timestamp = new Date().getTime()
  timestamp = Math.floor(timestamp/1000) + (24 * 60 * 60)
  // console.log(timestamp)
  try {
    let postbacksRes = await axios.post(
      'https://api.postbacks.io/v1/requestPostback',
      {
        "url": process.env.PUBLICENDPOINT,
        "send_at": timestamp,
        "body_string": "{  }"
      }
    )

    // console.log(postbacksRes)

  } catch(err) {console.log(err)}
}
