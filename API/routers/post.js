import { users } from "../tools/users.js";
import express, { urlencoded } from "express";
import validateUserInfo from "../tools/validateUserInfo.js";

const post = express();
post.use(express.urlencoded({extended: true}));

post.use(express.json());

post.post("/users", async (req, res)=>{
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
    res.status(201);
    res.json(newpost);
  }
  catch (error) {
    res.status(404).json({ message: error.message});
  }
});

export default post ;