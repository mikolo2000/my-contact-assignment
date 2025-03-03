import axios from "axios";

export default async function fetchUsers(users) {
  try {
    const response = await axios.get("https://dummyjson.com/users?limit=20&select=id,firstName,lastName,gender,email,phone,age");
    
    users.push(...response.data.users)
    
  } catch (error) {
    users.length = 0;
    console.log(error.message);
  }
}