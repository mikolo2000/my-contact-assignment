import { users } from "../tools/users.js";
import express from "express";

const deletePart = express();

deletePart.use(express.urlencoded({extended: true}));

deletePart.use(express.json());

deletePart.delete('/users/:id', (req, res)=>{
  try {
    const id = parseInt(req.params.id);
    const indexToDelete = users.findIndex((user)=>(id===user.id));
    if (indexToDelete===-1) {
      throw new Error("Error, user not found")
    }
    users.splice(indexToDelete,1);  
    res.json( "deleted Successfully");
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

export default deletePart;