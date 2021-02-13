const {db}=require("../admin");

exports.getResponses=(req,res)=>{
  db.collection('responses')
  .orderBy('createdAt','desc')
  .get()
  .then(data=>{
    let responses=[];
    data.forEach(doc=>{
      responses.push({
        responseId:doc.id,
        response:doc.data().response,
        studentId:doc.data().studentId,
        createdAt:doc.data().createdAt
      });
    });
    return res.json(responses);
  })
  .catch(err=>console.error(err));
}

exports.postResponse=(req,res)=>{
const newResponse={
    response:req.body.response,
    studentId:req.user.studentId,
    createdAt:new Date().toISOString()
  };

  db.collection('responses')
  .add(newResponse)
  .then(doc=>{
    res.json({message:"Your response got submitted successfully"})
  })
  .catch(err=>{
    res.status(500).json({error:"Failed attempt"})
    console.error(err)
  })
}
