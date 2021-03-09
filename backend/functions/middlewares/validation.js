//validator to check if field is empty
const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

//validate Email
const isValidEmail=(email)=>{
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isValidHostelId=(hostelId)=>{
  if (hostelId.match(/^[A-Z]*$/)) {
      return true;
  } else {
    return false;
  }
};

exports.validateSignup=(data)=>{
  let errors={};
if(isEmpty(data.email)){
  errors.email="Email must not be empty"
}else if(!isValidEmail(data.email)){
  errors.email="Enter valid email"
}

if(isEmpty(data.password)){
  errors.password="Password must not be empty"
}


if(isEmpty(data.name)){
  errors.name="Name must not be empty"
}

if(isEmpty(data.hostelId)){
  errors.hostelId="HostelId must not be empty"
}else if(!isValidHostelId(data.hostelId)){
  errors.hostelId="HostelId should be in uppercase"
}

return {
   errors,
   valid: Object.keys(errors).length === 0 ? true : false
 };
}

exports.validateLogin=(data)=>{
  let errors={};
  if(isEmpty(data.email)) errors.email="Email must not be empty";
  if(isEmpty(data.password)) errors.password="Password must not be empty";
  return {
   errors,
   valid: Object.keys(errors).length === 0 ? true : false
 };
}
