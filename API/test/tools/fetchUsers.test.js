import { http, HttpResponse } from "msw";
import fetchUsers from "../../tools/fetchUsers.js"; 
import { server } from "../mocks/server.js"; 
import users from "../mocks/mockUsers.js";

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("fetchUsers function", () => {
  beforeEach(()=>{
    users.length = 0;
  })

  it("should return a list of users when API call is successful", async () => {
     await fetchUsers(users); // Store result from function
    console.log("Users after fetch:", users); 

    expect(users).toHaveLength(3);  
  });

  it("should return an empty array when the API call fails", async () => {
    server.use(
      http.get("https://dummyjson.com/users", () => {
        return HttpResponse.json({ message: "error fetching data" }, { status: 400 });
      })
    );

    await fetchUsers(users);
    expect(users).toHaveLength(0);
  });
});
