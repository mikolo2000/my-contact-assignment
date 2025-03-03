import { users } from "./tools/users.js";
import express from "express";
import cors from "cors";
import getAll from "./routers/getAll.js"
import fetchUsers from "./tools/fetchUsers.js";
import post from "./routers/post.js";
import getPart from "./routers/getPart.js";
import put from "./routers/put.js";
import deletePart from "./routers/delete.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(getAll);
app.use(getPart);
app.use(post);
app.use(put);
// app.use(patch);
app.use(deletePart);

const port = process.env.PORT || 4000;



fetchUsers(users);

app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
})
console.log(users);
