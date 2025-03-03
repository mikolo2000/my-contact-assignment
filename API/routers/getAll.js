import { users } from "../tools/users.js";
import express from "express";

const getAll = express();

getAll.get("/users", async (req, res)=>{
  try {
    res.json(users);
  } catch (error) {
    res.status(500).send( "Error getting users");
  }
});

export default getAll ;