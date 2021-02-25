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

exports.sendNotification=(req,res)=>{
  var registrationTokens = [];
  db.collection('fcm')
  .get()
  .then(data=>{
    data.forEach(doc=>{
     registrationTokens.push(
      doc.data().token,
    );
    })
})
.then(()=>{
const message = {
  data: {score: '850', time: '2:45'},
  tokens: registrationTokens,
}
admin.messaging().sendMulticast(message)
  .then((response) => {
    return res.json(response.successCount + ' messages were sent successfully');})


})

  .catch(err=>console.error(err));




}
