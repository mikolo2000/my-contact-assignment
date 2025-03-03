import { users } from "../tools/users.js";
import express from "express";

const getPart = express();

getPart.get('/users/:id', (req, res)=>{
  try {
    const id = parseInt(req.params.id);
    const user = users.find((user)=>(user.id===id));
    if (!user) {
      throw new Error('User not found');
    }
    res.json(user); 
  } catch (error) {
    res.status(404).send("User not found");
  }
});

export default getPart;