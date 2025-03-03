import request from "supertest";
import getAll from "../../routers/getAll"; // Import Express app
import { users } from "../../tools/users";




describe("GET /users", () => {
  beforeEach(() => {
    users.length = 0; 
  });

  it("should return a list of all users", async () => {
    users.push(
      { id: 1, firstName: "John", lastName: "Doe", gender: "male", email: "john@example.com", phone: "+123456789", age: 30 },
      { id: 2, firstName: "Jane", lastName: "Doe", gender: "female", email: "jane@example.com", phone: "+987654321", age: 28 }
    );

    const res = await request(getAll).get("/users"); // Directly test the app

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("should return an empty array if no users are available", async () => {
    const res = await request(getAll).get("/users"); 
    

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]); 
  });
});
