const express = require("express");
const axios = require("axios");
const Joi = require("joi");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
let users = [];

const validateUserInfo = (data)=>{
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    gender: Joi.string().min(4).required(),
    age: Joi.number().integer().min(1).max(120),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).allow(null, '')
  });

  return schema.validate(data);
}


const fetchUsers = async()=>{
  try {
    const response = await axios.get("https://dummyjson.com/users?limit=20&select=id,firstName,lastName,gender,email,phone,age");
    
    users =response.data.users;
    
  } catch (error) {
    console.log(error);
  }
};

fetchUsers();




// to get all twenty users
app.get('/users', (req, res)=>{
  try {
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "Error getting users"});
  }
});

//get a particular user
app.get('/users/:id', (req, res)=>{
  try {
    const id = parseInt(req.params.id);
    const user = users.find((user)=>(user.id===id));
    if (!user) {
      throw new Error('User not found');
    }
    res.json(user); 
  } catch (error) {
    res.status(404).send("User not found");;
  }
});


//Register a user
app.post('/users', (req, res)=>{
try {
  const { firstName, lastName, gender, email, phone, age } = req.body;
  const result = validateUserInfo(req.body);
  

  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  const newpost = {
    id: users.length +1,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    email: email,
    phone: phone,
    age: age
  }
  users.push(newpost);
  res.json('User Successfully added');
}
catch (error) {
  res.status(404).json({ message: error.message});
}
});



// edit a users complete detail
app.put('/users/:id', (req, res)=>{
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, gender, email, phone, age } = req.body;
    const result = validateUserInfo(req.body);
    
  
    if (result.error) {
      throw new Error(result.error.details[0].message);
    }
    
    const editedDetails = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      phone: phone,
      age: age
    };
    const userIndex = users.findIndex((user)=>(user.id===id));
    users[userIndex] = editedDetails;
    res.json('User Successfully updated');
  } catch (error) {
    res.status(404).json({ message: error.message});
  }
});


// edit part of users details
app.patch('/users/:id', (req, res)=>{
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, gender, email, phone, age } = req.body;
    const userOriginalDetails = users.find((user)=>(user.id===id));
   
    const schema = Joi.object({
      firstName: Joi.string().min(3).allow(null,''),
      lastName: Joi.string().min(3).allow(null,''),
      gender: Joi.string().min(4).allow(null,''),
      age: Joi.number().integer().min(1).max(120).allow(null,''),
      email: Joi.string().email().allow(null,''),
      phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).allow(null, '')
    });
  
    const result = schema.validate(req.body);
    
  
    if (result.error) {
      throw new Error(result.error.details[0].message);
    }

    const editedDetails = {
      id: id,
      firstName: firstName || userOriginalDetails.firstName ,
      lastName: lastName || userOriginalDetails.lastName,
      gender: gender || userOriginalDetails.gender,
      email: email || userOriginalDetails.email,
      phone: phone || userOriginalDetails.phone,
      age: age || userOriginalDetails.age
    };
    const userIndex = users.findIndex((user)=>(user.id===id));
    users[userIndex] = editedDetails;
    res.json('User Successfully updated');
  } catch (error) {
    res.status(404).json({ message: error.message});
  }
});

app.delete('/users/:id', (req, res)=>{
  try {
    const id = parseInt(req.params.id);
    const indexToDelete = users.findIndex((user)=>(id===user.id));
    if (indexToDelete===-1) {
      throw new Error("Error, user not found")
    }
    users.splice(indexToDelete,1);  
    res.json( "deleted Successfully");
  } catch (error) {
    res.json({message: error.message});
  }
});

app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});

module.exports = fetchUsers();
module.exports = app;