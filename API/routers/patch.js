import express from "express";
import Joi from "joi";
import { users } from "../tools/users.js";

const patch = express();

patch.use(express.urlencoded({extended: true}));
patch.use(express.json());

patch.patch('/users/:id', (req, res)=>{
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
    res.json(editedDetails);
  } catch (error) {
    res.status(404).json({ message: error.message});
  }
});

export default patch;