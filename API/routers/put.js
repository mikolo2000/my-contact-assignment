import { users } from "../tools/users.js";
import express from "express";
import validateUserInfo from "../tools/validateUserInfo.js";

const put = express();
put.use(express.urlencoded({extended: true}));
put.use(express.json());

put.put('/users/:id', (req, res)=>{
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
    if (userIndex === -1){
      throw new Error("Error finding user")
    }
    users[userIndex] = editedDetails;
    res.json(editedDetails);
  } catch (error) {
    res.status(404).json({ message: error.message});
  }
});


export default put;