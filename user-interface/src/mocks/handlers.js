import { http, HttpResponse } from 'msw'
 const users = [ {
  id: 1,
  firstName: "Emily",
  lastName: "Johnson",
  age: 28,
  gender: "female",
  email: "emily.johnson@x.dummyjson.com",
  phone: "+81 965-431-3024",
  
},
{
  id: 2,
  firstName: "Ekundayo",
  lastName: "Samuel",
  age: 30,
  gender: "male",
  email: "emily.johnson@x.dummyjson.com",
  phone: "+81 965-431-3024",
  
},
{
  id: 3,
  firstName: "Ogala",
  lastName: "Thomas",
  age: 28,
  gender: "male",
  email: "emily.johnson@x.dummyjson.com",
  phone: "+81 965-431-3024",
  
}];
export const handlers = [
    http.get('http://localhost:4000/users', () => {
    
    
    return HttpResponse.json(users);
  }),

  http.get('http://localhost:4000/users/:id',({ params })=> {
    const { id } = params;

    const user = users.find((user)=>(user.id = parseInt(id)))
    return HttpResponse.json(user);
  })
]