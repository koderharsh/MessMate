const {db}=require("../admin");

exports.getResponses=(req,res)=>{
  db.collection('responses')
  .orderBy('createdAt','desc')
  .get()
  .then(data=>{
    let responses=[];
    data.forEach(doc=>{
      if(req.user.college===doc.data().college&&new Date().toISOString().slice(0,10)===doc.data().createdAt){
      responses.push({
        responseId:doc.id,
        response:doc.data().response,
        studentId:doc.data().studentId,
        college:doc.data().college,
        createdAt:doc.data().createdAt
      });
    }
    });
    return res.json(responses);
  })
  .catch(err=>console.error(err));
}

exports.postResponse=(req,res)=>{
const newResponse={
    response:req.body.response,
    studentId:req.user.studentId,
    college:req.user.college,
    createdAt:new Date().toISOString().slice(0,10)
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
