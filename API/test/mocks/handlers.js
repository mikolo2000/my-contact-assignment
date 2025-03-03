import { http, HttpResponse } from "msw";

const users = [
  {
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
    email: "ekundayo.samuel@x.dummyjson.com",
    phone: "+81 965-431-3025",
  },
  {
    id: 3,
    firstName: "Ogala",
    lastName: "Thomas",
    age: 28,
    gender: "male",
    email: "ogala.thomas@x.dummyjson.com",
    phone: "+81 965-431-3026",
  },
];

const handlers = [
  http.get("https://dummyjson.com/users", ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit"); // Extract query parameter

    // Apply the limit if provided
    const filteredUsers = limit ? users.slice(0, parseInt(limit, 10)) : users;

    return HttpResponse.json({ users: filteredUsers });
  }),
];

export default handlers;
