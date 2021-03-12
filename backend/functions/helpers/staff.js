const {db}=require("../admin");
const firebase=require("firebase");

const {validateSignup,validateLogin}=require("../middlewares/validation");

exports.staffSignup=(req,res)=>{

  const newStaff={
    email:req.body.email,
    password:req.body.password,
    name:req.body.name,
    hostelId:req.body.hostelId,
  };

  const { valid, errors } = validateSignup(newStaff);
  if (!valid) return res.status(400).json({errors});

  let stafftoken,staffId,hostelId;
  firebase.auth().createUserWithEmailAndPassword(newStaff.email,newStaff.password)
  .then(data=>{
    staffId=data.user.uid;
    return data.user.getIdToken();
  })
  .then(token=>{
    stafftoken=token;
    const staffCredentials={
      name:newStaff.name,
      email:newStaff.email,
      hostelId:newStaff.hostelId,
      createdAt:new Date().toISOString(),
      staffId
    };
   hostelId=newStaff.hostelId;
    return db.doc(`staff/${staffId}`).set(staffCredentials);
})
.then(()=>{
  return res.status(201).json({stafftoken,staffId,hostelId});
})
  .catch(err=>{
    console.error(err);
    if(err.code==="auth/email-already-in-use"){
      return res.status(400).json({errors:{general:"Email is already in use"}});
    }else if(err.code==="auth/weak-password"){
      return res.status(400).json({errors:{password:"Password must contain atleast 6 characters"}});
    }else
    return res.status(500).json({error:err.code});
  })
}

exports.staffLogin=(req,res)=>{
  const staff={
    email:req.body.email,
    password:req.body.password
  };

  const { valid, errors } = validateLogin(staff);
  if (!valid) return res.status(400).json({errors});

 let stafftoken,staffId,hostelId;
  firebase.auth().signInWithEmailAndPassword(staff.email,staff.password)
  .then(data=>{
    staffId=data.user.uid;
    return data.user.getIdToken();
  })
  .then(token=>{
    stafftoken=token;
    db.collection(`staff`).doc(`${staffId}`).get().then(doc=>{
      if(!doc.data())
      return res.json({errors:{general:"Not a staff memeber"}});
      else{
        hostelId=doc.data().hostelId;
        return res.json({stafftoken,staffId,hostelId});
      }
      })
  })
  .catch(err=>{
    console.error(err);
    return res.status(403).json({errors:{general:"Wrong credentials, please try again"}});
  })
}
