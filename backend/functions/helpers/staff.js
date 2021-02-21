const {db}=require("../admin");
const firebase=require("firebase");

const {validateSignup,validateLogin}=require("../middlewares/validation");

exports.staffSignup=(req,res)=>{

  const newStaff={
    email:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword,
    name:req.body.name,
    hostel:req.body.hostel,
    hostelId:req.body.hostelId,
  };

  const { valid, errors } = validateSignup(newStaff);
  if (!valid) return res.status(400).json(errors);

  let stafftoken,staffId;
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
      hostel:newStaff.hostel,
      hostelId:newStaff.hostelId,
      createdAt:new Date().toISOString(),
      staffId
    };

    return db.doc(`staff/${staffId}`).set(staffCredentials);
})
.then(()=>{
  return res.status(201).json({stafftoken,staffId});
})
  .catch(err=>{
    console.error(err);
    if(err.code==="auth/email-already-in-use"){
      return res.status(400).json({email:"Email is already in use"});
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
  if (!valid) return res.status(400).json(errors);

 let stafftoken,staffId;
  firebase.auth().signInWithEmailAndPassword(staff.email,staff.password)
  .then(data=>{
    staffId=data.user.uid;
    return data.user.getIdToken();
  })
  .then(token=>{
    stafftoken=token;
    return res.json({stafftoken,staffId});
  })
  .catch(err=>{
    console.error(err);
    return res.status(403).json({general:"Wrong credentials, please try again"});
  })
}
