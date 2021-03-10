const { admin,db } = require('../admin');
const firebase=require("firebase");
exports.postStaffNotification=(req,res)=>{
  var description=req.body.description;
  var hostelId=req.user.hostelId;
  db.collection('fcm')
  .get()
  .then(data=>{
    let registrationTokens=[];
    data.forEach(doc=>{
      if(doc.data().hostelId===hostelId)
      registrationTokens.push(doc.data().token);

    });
    return registrationTokens;
  }).then(registrationTokens=>{
    //console.log(registrationTokens)
    admin.messaging().subscribeToTopic(registrationTokens,hostelId)
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
            body: description
          },
          topic: hostelId,

        };

        admin.messaging().send(message)
          .then((response) => {
            // Response is a message ID string.
            return res.json(response)
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      })

  })
  .catch(err=>console.error(err));
}
